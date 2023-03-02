importScripts("./comlink_4.3.1.min.js");
importScripts("./dfreader_wasm.f029c5c.js");

let MODULE = null;
let READER = null;
let startTime = Date.now();

// The promise resolves when the wasm module is fully loaded
// see https://emscripten.org/docs/getting_started/FAQ.html#how-can-i-tell-when-the-page-is-fully-loaded-and-it-is-safe-to-call-compiled-functions
dfreader().then(function (Module) {
  MODULE = Module;
});

const api = {
  ready() {
    return Boolean(MODULE);
  },
  setConfigAPIJson(json) {
    return MODULE.DataFieldReader.setConfigAPIJson(json);
  },
  createFromConfigAPIJson(name, url, productNo) {
    const oldReader = READER;
    READER = new MODULE.DataFieldReader(name, url, productNo);
    if (oldReader) {
      // we are responsible for memory management here
      // see https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#memory-management
      oldReader.delete();
    }
    return Boolean(READER);
  },
  toJson() {
    return READER.toJson();
  },
  getParamFloat(name) {
    return READER.getParamFloat(name);
  },
  setParamFloat(name, val) {
    return READER.setParamFloat(name, val);
  },
  getParamString(name) {
    return READER.getParamString(name);
  },
  setParamString(name, val) {
    return READER.setParamString(name, val);
  },
  getResultFloat(name) {
    return READER.getResultFloat(name);
  },
  getResultString(name) {
    return READER.getResultString(name);
  },
  getResultJson() {
    return READER.getResultJson();
  },
  processByteToByte(name, srcImage, srcWidth, srcHeight, srcWidthStep) {
    return READER.processByteToByte(
      name,
      srcImage,
      srcWidth,
      srcHeight,
      srcWidthStep
    );
  },
};

function rgbaToGray(input, width, height, output) {
  const size = width * height * 4;
  for (let i = 0, j = 0; i < size; i += 4, j++) {
    output[j] = (input[i] + input[i + 1] + input[i + 2]) / 3;
  }
}

const module = {
  process(
    data,
    width,
    height,
    zoomFactor,
    torchEnabled,
    lensPos,
    iso,
    exposureTime,
    widthAfterZoomin
  ) {
    if (!api || !READER) {
      return {
        resultCode: 0,
        shouldZoom: 0.0,
        shouldTorch: 0.0,
        shouldFocus: 0.0,
        distance: 1.0,
        resultString: "",
        barcode: "",
        activeProduct: 0,
      };
    }

    api.setParamFloat("in_zoomFactor", zoomFactor);
    api.setParamFloat("in_torchEnabled", torchEnabled);
    api.setParamFloat("in_dateNow", Date.now() - startTime);

    api.setParamFloat("in_lensFocusDistance", lensPos);
    api.setParamFloat("in_ISO", iso);
    api.setParamFloat("in_ExposureTime", exposureTime);

    api.setParamFloat("Barcode_Size_opt_pix", widthAfterZoomin);

    const dataGray = new Uint8ClampedArray(width * height);
    rgbaToGray(data, width, height, dataGray);
    api.processByteToByte("Decode", dataGray, width, height, width);

    const resultCode = api.getResultFloat("ResultCode");
    const shouldZoom = api.getResultFloat("ShouldZoom");
    const shouldTorch = api.getResultFloat("ShouldTorch");
    const shouldFocus = api.getResultFloat("ShouldFocus");
    const distance = api.getResultFloat("BarcodeDistance");
    const barcode = api.getResultString("BarcodeData");
    const activeProduct = api.getResultFloat("ActiveProduct");

    let resultString = "";
    if (resultCode == 1 || resultCode == 11) {
      resultString = api.getResultJson();
    }

    return {
      resultCode,
      shouldZoom,
      shouldTorch,
      shouldFocus,
      distance,
      resultString,
      barcode,
      activeProduct,
    };
  },
  configureFromAPI(configJSON, url, activeProductNr) {
    api.setConfigAPIJson(configJSON);
    api.createFromConfigAPIJson("ValigateReader", url, activeProductNr);
    const parsedJSON = api.getResultString("ParsedJSON");
    return parsedJSON;
  },
  ready() {
    return api.ready();
  },
};

Comlink.expose(module);
