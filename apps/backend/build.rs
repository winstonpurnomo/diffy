fn main() {
    println!("cargo:rerun-if-changed=../../packages/rpc/diffy/v1/diffy.proto");
    println!("cargo:rerun-if-changed=../../packages/rpc");
    println!("cargo:rerun-if-changed=build.rs");

    let protoc = protoc_bin_vendored::protoc_bin_path().expect("find vendored protoc");
    unsafe {
        std::env::set_var("PROTOC", protoc);
    }

    connectrpc_build::Config::new()
        .files(&["../../packages/rpc/diffy/v1/diffy.proto"])
        .includes(&["../../packages/rpc"])
        .include_file("_connectrpc.rs")
        .compile()
        .expect("generate ConnectRPC Rust bindings");
}
