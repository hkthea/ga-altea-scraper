const dotenv = require('dotenv');

dotenv.config();

let whitelist_ip=process.env.WHITELIST_IP && process.env.WHITELIST_IP.split('|');

let proofJson='{"proof":"{{{proof}}}","fp2":{"userAgent":"Mozilla/5.0(WindowsNT10.0;Win64;x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/72.0.3626.121Safari/537.36","language":"en-US","screen":{"width":1536,"height":864,"availHeight":824,"availWidth":1536,"pixelDepth":24,"innerWidth":1536,"innerHeight":722,"outerWidth":1536,"outerHeight":824,"devicePixelRatio":1.25},"timezone":7,"indexedDb":true,"addBehavior":false,"openDatabase":true,"cpuClass":"unknown","platform":"Win32","doNotTrack":"unknown","plugins":"ChromePDFPlugin::PortableDocumentFormat::application/x-google-chrome-pdf~pdf;ChromePDFViewer::::application/pdf~pdf;NativeClient::::application/x-nacl~,application/x-pnacl~,application/x-ppapi-vysor~,application/x-ppapi-vysor-audio~","canvas":{"winding":"yes","towebp":true,"blending":true,"img":"4f1ed4406b8e3a3f2b0c28e6805963c722e4ef6f"},"webGL":{"img":"bd6549c125f67b18985a8c509803f4b883ff810c","extensions":"ANGLE_instanced_arrays;EXT_blend_minmax;EXT_color_buffer_half_float;EXT_disjoint_timer_query;EXT_frag_depth;EXT_shader_texture_lod;EXT_texture_filter_anisotropic;WEBKIT_EXT_texture_filter_anisotropic;EXT_sRGB;OES_element_index_uint;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBKIT_WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBKIT_WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBKIT_WEBGL_lose_context","aliasedlinewidthrange":"[1,1]","aliasedpointsizerange":"[1,1024]","alphabits":8,"antialiasing":"yes","bluebits":8,"depthbits":24,"greenbits":8,"maxanisotropy":16,"maxcombinedtextureimageunits":32,"maxcubemaptexturesize":16384,"maxfragmentuniformvectors":1024,"maxrenderbuffersize":16384,"maxtextureimageunits":16,"maxtexturesize":16384,"maxvaryingvectors":30,"maxvertexattribs":16,"maxvertextextureimageunits":16,"maxvertexuniformvectors":4096,"maxviewportdims":"[16384,16384]","redbits":8,"renderer":"WebKitWebGL","shadinglanguageversion":"WebGLGLSLES1.0(OpenGLESGLSLES1.0Chromium)","stencilbits":0,"vendor":"WebKit","version":"WebGL1.0(OpenGLES2.0Chromium)","vertexshaderhighfloatprecision":23,"vertexshaderhighfloatprecisionrangeMin":127,"vertexshaderhighfloatprecisionrangeMax":127,"vertexshadermediumfloatprecision":23,"vertexshadermediumfloatprecisionrangeMin":127,"vertexshadermediumfloatprecisionrangeMax":127,"vertexshaderlowfloatprecision":23,"vertexshaderlowfloatprecisionrangeMin":127,"vertexshaderlowfloatprecisionrangeMax":127,"fragmentshaderhighfloatprecision":23,"fragmentshaderhighfloatprecisionrangeMin":127,"fragmentshaderhighfloatprecisionrangeMax":127,"fragmentshadermediumfloatprecision":23,"fragmentshadermediumfloatprecisionrangeMin":127,"fragmentshadermediumfloatprecisionrangeMax":127,"fragmentshaderlowfloatprecision":23,"fragmentshaderlowfloatprecisionrangeMin":127,"fragmentshaderlowfloatprecisionrangeMax":127,"vertexshaderhighintprecision":0,"vertexshaderhighintprecisionrangeMin":31,"vertexshaderhighintprecisionrangeMax":30,"vertexshadermediumintprecision":0,"vertexshadermediumintprecisionrangeMin":31,"vertexshadermediumintprecisionrangeMax":30,"vertexshaderlowintprecision":0,"vertexshaderlowintprecisionrangeMin":31,"vertexshaderlowintprecisionrangeMax":30,"fragmentshaderhighintprecision":0,"fragmentshaderhighintprecisionrangeMin":31,"fragmentshaderhighintprecisionrangeMax":30,"fragmentshadermediumintprecision":0,"fragmentshadermediumintprecisionrangeMin":31,"fragmentshadermediumintprecisionrangeMax":30,"fragmentshaderlowintprecision":0,"fragmentshaderlowintprecisionrangeMin":31,"fragmentshaderlowintprecisionrangeMax":30},"touch":{"maxTouchPoints":0,"touchEvent":false,"touchStart":false},"video":{"ogg":"probably","h264":"probably","webm":"probably"},"audio":{"ogg":"probably","mp3":"probably","wav":"probably","m4a":"maybe"},"vendor":"GoogleInc.","product":"Gecko","productSub":"20030107","browser":{"ie":false,"chrome":true,"webdriver":false},"window":{"historyLength":3,"hardwareConcurrency":4,"iframe":false},"fonts":"Calibri;Century;Haettenschweiler;Marlett;Pristina"},"cookies":1,"setTimeout":0,"setInterval":0,"appName":"Netscape","platform":"Win32","syslang":"en-US","userlang":"en-US","cpu":"","productSub":"20030107","plugins":{"0":"ChromePDFPlugin","1":"ChromePDFViewer","2":"NativeClient"},"mimeTypes":{"0":"application/pdf","1":"PortableDocumentFormatapplication/x-google-chrome-pdf","2":"NativeClientExecutableapplication/x-nacl","3":"PortableNativeClientExecutableapplication/x-pnacl","4":"application/x-ppapi-vysor","5":"application/x-ppapi-vysor-audio"},"screen":{"width":1536,"height":864,"colorDepth":24},"fonts":{"0":"Calibri","1":"Cambria","2":"Constantia","3":"LucidaBright","4":"Georgia","5":"SegoeUI","6":"Candara","7":"TrebuchetMS","8":"Verdana","9":"Consolas","10":"LucidaConsole","11":"LucidaSansTypewriter","12":"CourierNew","13":"Courier"}}'

const ENVIRONMENT = {
    port:process.env.PORT,
    altea_username:process.env.ALTEA_USERNAME,
    altea_password:process.env.ALTEA_PASSWORD,
    altea_process_count:process.env.ALTEA_PROCESS_COUNT,
    whitelist:whitelist_ip,
    redis_host:process.env.REDIS_HOST,
    redis_port:process.env.REDIS_PORT,
    redis_user:process.env.REDIS_USER,
    redis_password:process.env.REDIS_PASSWORD,
    rabbit_host:process.env.RABBIT_HOST,
    rabbit_port:process.env.RABBIT_PORT,
    rabbit_username:process.env.RABBIT_USERNAME,
    rabbit_password:process.env.RABBIT_PASSWORD,
    imap_username:process.env.IMAP_USERNAME,
    imap_host:process.env.IMAP_HOST,
    imap_password:process.env.IMAP_PASSWORD,
    imap_port:process.env.IMAP_PORT,
    imap_use_tls:process.env.IMAP_TLS,
    altea_proof_json:proofJson
}

module.exports = ENVIRONMENT;