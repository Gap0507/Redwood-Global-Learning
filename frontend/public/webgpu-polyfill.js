// WebGPU Polyfill for mobile browsers
// This prevents errors when Three.js checks for WebGPU support

if (typeof window !== 'undefined') {
    if (typeof window.GPUShaderStage === 'undefined') {
        window.GPUShaderStage = { VERTEX: 1, FRAGMENT: 2, COMPUTE: 4 };
    }
    if (typeof window.GPUBufferUsage === 'undefined') {
        window.GPUBufferUsage = {
            MAP_READ: 1,
            MAP_WRITE: 2,
            COPY_SRC: 4,
            COPY_DST: 8,
            INDEX: 16,
            VERTEX: 32,
            UNIFORM: 64,
            STORAGE: 128,
            INDIRECT: 256,
            QUERY_RESOLVE: 512,
        };
    }
}
