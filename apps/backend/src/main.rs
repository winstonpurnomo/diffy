use axum::{
    Router as AxumRouter,
    http::{HeaderName, Method},
    routing::get,
};
use connectrpc::{RequestContext, Response, Router as ConnectRouter};
use std::sync::Arc;
use tower_http::{
    cors::{Any, CorsLayer},
    trace::TraceLayer,
};

include!(concat!(env!("OUT_DIR"), "/_connectrpc.rs"));

use crate::diffy::v1::{
    DemoService, DemoServiceExt, GetGreetingResponse, OwnedGetGreetingRequestView,
};

struct DemoApi;

impl DemoService for DemoApi {
    #[allow(refining_impl_trait)]
    async fn get_greeting(
        &self,
        _ctx: RequestContext,
        request: OwnedGetGreetingRequestView,
    ) -> connectrpc::ServiceResult<GetGreetingResponse> {
        let name = request.name.trim();
        let name = if name.is_empty() { "ConnectRPC" } else { name };
        let language = request.attempt;

        let generated_at_unix_ms = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap_or_default()
            .as_millis() as i64;

        Response::ok(GetGreetingResponse {
            message: format!("Hola, {name}. This came from Rust over ConnectRPC."),
            served_by: "diffy-backend".to_string(),
            generated_at_unix_ms,
            ..Default::default()
        })
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt()
        .with_env_filter(
            std::env::var("RUST_LOG")
                .unwrap_or_else(|_| "diffy_backend=info,tower_http=info".to_string()),
        )
        .init();

    let demo = Arc::new(DemoApi);
    let connect = demo.register(ConnectRouter::new());
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers([
            HeaderName::from_static("content-type"),
            HeaderName::from_static("connect-protocol-version"),
            HeaderName::from_static("connect-timeout-ms"),
            HeaderName::from_static("x-user-agent"),
        ]);
    let app = AxumRouter::new()
        .route("/health", get(|| async { "ok" }))
        .fallback_service(connect.into_axum_service())
        .layer(TraceLayer::new_for_http())
        .layer(cors);

    let addr = std::env::var("BACKEND_ADDR").unwrap_or_else(|_| {
        let port = std::env::var("PORT").unwrap_or_else(|_| "8080".to_string());
        format!("127.0.0.1:{port}")
    });
    let listener = tokio::net::TcpListener::bind(&addr).await?;
    tracing::info!("ConnectRPC backend listening on http://{addr}");
    axum::serve(listener, app).await?;

    Ok(())
}
