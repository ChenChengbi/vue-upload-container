import axios from "axios";

const UPLOAD_TIMEOUT = 0;

const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

const uploadAxios = axios.create({
    timeout: UPLOAD_TIMEOUT,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
});

/**
 * @description 上传文件到服务器的方法
 * @param {string} url 地址
 * @param {File} file 表单文件对象
 * @param {Object} extraData 除了文件外，需要上传其它字段
 * @param {Function} onBegin 上传开始时的回调，参数：file, cancel, extraData
 * @param {Function} onSuccess 上传成功时的回调，参数：result, file, extraData
 * @param {Function} onProgress 上传过程中的回调(有可能会多次触发，每次代表不同的上传进度)，参数：file, {percent: percent, total: e.total}, extraData
 * @param {Function} onError 上传失败时的回调，参数：err, file, extraData
 * @param {string} fileAttrName 文件对象的表单属性名
 * @param {string} postOrPut 以post还是以put方式上传文件
 * @returns {Function} 用于中止上传的函数
 */
function upload({
    url,
    file,
    extraData,
    headers,
    onBegin,
    onSuccess,
    onProgress,
    onError,
    fileAttrName = 'file',
}) {
    let formData = new FormData() // FormData 对象

    for (const key in extraData) {
        if (Object.prototype.hasOwnProperty.call(extraData, key)) {
            const attr = extraData[key];
            formData.append(key, attr);
        }
    }

    formData.append(fileAttrName, file);

    let cancel;
    let cancelToken = new CancelToken(function executor(c) {
        // executor 函数接收一个 cancel 函数作为参数
        cancel = c;
    });

    onBegin && onBegin(file, cancel, extraData);

    uploadAxios.post(url, formData, {
        headers: {
            ...headers
        },
        onUploadProgress: function (e) {
            let percent = Math.round(e.loaded / e.total * 100) || 0;
            onProgress && onProgress(file, {
                percent: percent,
                total: e.total,
            }, extraData);
        },
        cancelToken: cancelToken
    }).then((res) => {
        onSuccess && onSuccess(res.data.result, file, extraData)
    }).catch(err => {
        onError && onError(err, file, extraData);
    });

    return cancel;
}

export default {
    upload
};