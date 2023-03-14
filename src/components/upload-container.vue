<template>
  <div class="upload-btn">
    <div class="upload" @click.stop="handleBtnFileUpload">
      <slot v-bind="{ fileList, currFile }"></slot>
    </div>
    <input
      type="file"
      name="resource"
      :multiple="multiple"
      :accept="accept"
      ref="resource"
      @change="handleFileInputChange"
    />
  </div>
</template>
<script>
import UploadAxios from "../api/upload-axios.js";

class FileEntity {
  constructor({ name, size, type, percent = 0, originalFile }) {
    this.name = name;
    this.size = size;
    this.type = type;
    this.percent = percent;
    this.originalFile = originalFile;
  }
}

export default {
  props: {
    disabled: { type: Boolean, default: false }, // 是否不可用
    action: { type: String, required: true }, // 上传文件的地址
    multiple: { type: Boolean, default: false }, // file类型input的原生属性，是否允许多选文件
    fileName: { type: String, default: "file" }, // 文件对象对应的表单字段名
    limit: { type: Number, default: Infinity }, // 同一时间上传文件的个数限制
    minSize: { type: Number, default: 0 }, // 文件的最小大小
    maxSize: { type: Number, default: Infinity }, // 文件的最大大小
    accept: { type: String }, // 限制可接受的文件类型，参考：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file#%E9%99%90%E5%88%B6%E5%8F%AF%E6%8E%A5%E5%8F%97%E7%9A%84%E6%96%87%E4%BB%B6%E7%B1%BB%E5%9E%8B
    autoUpload: { type: Boolean, default: true }, // 是否选好文件后就自动上传
    // 上传时附带的额外参数
    extraData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 设置上传的请求头部
    headers: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 注：文件大小 和 文件名 都是本组件从文件对象中读取的
    fileSizeAttrName: String, // 文件大小 字段对应的字段名（如果不传，则每个文件的大小不会上传服务器）
    fileNameAttrName: String, // 文件名 字段对应的字段名（如果不传，则每个文件的文件名不会上传服务器）

    beforeSelectFile: { type: Function, default: () => {} }, // 选择要上传的文件之前的钩子，返回false将不再弹窗选择文件，无参数
    beforeUploadAll: Function, // 上传所有文件之前的钩子，返回false将会中止所有文件上传，参数：files
    beforeUpload: Function, // 上传单个文件之前的钩子，返回false将会中止单个文件上传，返回非false则正常上传，返回对象则对象本身会追加到extraData中，参数：file, files
    onBegin: Function, // 开始上传单个文件时的钩子，后于beforeUpload，文件必定会开始上传，参数：file, cancel, extraData
    onChange: Function, // 选择要上传的文件时的钩子，参数：files
    onSuccess: Function, // 单个文件上传成功时的钩子，参数：result, file, extraData
    onProgress: Function, // 单个文件上传的进度钩子(上传过程中不断触发)，参数：file, {percent, total}, extraData
    onError: Function, // 单个文件上传错误时的钩子，参数：err, file, extraData
    onExceedLimit: Function, // 超过上传文件的个数限制时的钩子，参数：files
    onExceedMinSize: Function, // 某个文件大小小于文件最小限制时的钩子，参数：files
    onExceedMaxSize: Function, // 某个文件大小大于文件最大限制时的钩子，参数：files
  },
  data() {
    return {
      refFileInput: null,
      fileList: [],
      currFile: {},
    };
  },
  mounted() {
    this.refFileInput = this.$refs["resource"];
    this.refFileInput.style.display = "none";
  },
  methods: {
    SetFiles(files) {
      if (this.refFileInput) {
        this.refFileInput.files = files;
      } else {
        throw new Error("refFileInput 未初始化");
      }
    },

    // 清空选择的所有文件(恢复input的初始状态，目的是使onChange事件在选择同一文件时也会触发)
    ClearFiles() {
      this.refFileInput.value = null;
    },

    // 上传按钮被物理点击时的回调
    async handleBtnFileUpload() {
      if (!this.disabled) {
        const result = await this.beforeSelectFile();
        if (result !== false) {
          this.refFileInput && this.refFileInput.click();
        }
      }
    },

    // 选择要上传的文件时的回调
    handleFileInputChange(event) {
      const files = event.target.files;

      this.fileList = []; // 先清空之前的选择
      for (const file of files) {
        this.fileList.push(
          new FileEntity({
            name: file.name,
            size: file.size,
            type: file.type,
            originalFile: file,
          })
        );
      }

      this.onChange && this.onChange(files);
      if (this.autoUpload) {
        this.upload(files);
      }
    },

    // 上传文件
    upload(files) {
      const _files = files ? files : this.refFileInput.files;
      if (this.beforeUploadAll) {
        const beforeAll = this.beforeUploadAll(_files);
        if (beforeAll && beforeAll.then) {
          beforeAll.then((result) => {
            if (result !== false) {
              this.$$_upload(_files);
            }
          });
          // .catch((err) => {
          //   // console.log("err :>> ", err);
          // });
        } else if (beforeAll !== false) {
          this.$$_upload(_files);
        }
      } else {
        this.$$_upload(_files);
      }
    },

    /**
     * @description 上传多个文件
     * @param {Array.<File>} files 表单文件对象数组
     */
    $$_upload(files) {
      // 检测文件数量是否超出上限
      if (this.limit && this.limit > 0) {
        if (files.length > this.limit) {
          this.onExceedLimit && this.onExceedLimit(files);
          return;
        }
      }

      // 检测是否有文件大小小于最小限定
      if (this.minSize) {
        for (const file of files) {
          if (file.size < this.minSize) {
            this.onExceedMinSize && this.onExceedMinSize(files);
            return;
          }
        }
      }

      // 检测是否有文件大小大于最大限定
      if (this.maxSize) {
        for (const file of files) {
          if (file.size > this.maxSize) {
            this.onExceedMinSize && this.onExceedMaxSize(files);
            return;
          }
        }
      }

      if (this.beforeUpload) {
        for (const file of files) {
          const before = this.beforeUpload(file, files);
          if (before && before.then) {
            before.then((result) => {
              if (result !== false) {
                this.$_upload(file, files, result);
              }
            });
          } else if (before !== false) {
            this.$_upload(file, files, before);
          }
        }
      } else {
        for (const file of files) {
          this.$_upload(file, files);
        }
      }
    },

    /**
     * @description 上传单个文件
     * @param {File} file 表单文件对象
     * @param {Array.<File>} files 表单文件对象数组
     * @param {Object} moreExtraData 更多的额外数据
     * @returns {Function} 用于中止上传的函数
     */
    $_upload(file, files, moreExtraData) {
      let extraData = JSON.parse(JSON.stringify(this.extraData));
      extraData = { ...extraData, ...moreExtraData };

      if (this.fileSizeAttrName) extraData[this.fileSizeAttrName] = file.size;
      if (this.fileNameAttrName) extraData[this.fileNameAttrName] = file.name;

      // let slicedBlob = file.slice(start);

      this.currFile = new FileEntity({
        name: file.name,
        size: file.size,
        type: file.type,
        originalFile: file,
      });

      return UploadAxios.upload({
        url: this.action,
        file: file,
        // slicedBlob,
        extraData: extraData,
        headers: this.headers,
        onBegin: this.onBegin,
        onSuccess: this.onSuccess,
        onProgress: function (file, { percent, total }, extraData) {
          this.currFile.percent = percent;
          this.onProgress(file, { percent, total }, extraData);
        },
        onError: this.onError,
        fileAttrName: this.fileName,
        // postOrPut: this.postOrPut,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-btn {
  display: inline-block;
  .upload {
    width: 100%;
    height: 100%;
    display: inline-block;
    // text-align: center;
    cursor: pointer;
    outline: 0;
  }
}
</style>