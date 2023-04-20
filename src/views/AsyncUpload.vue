<!--
 * @Author: Billy
 * @Date: 2023-04-19 17:00:25
 * @LastEditors: Billy
 * @LastEditTime: 2023-04-20 14:44:20
 * @Description: 请输入
-->
<template>
  <div class="async-upload">
    <UploadContainer
      ref="UploadContainer"
      :action="uploadUrl"
      :headers="{ Token: token }"
      :maxSize="1024 * 1024"
      :onChange="onChange"
      :autoUpload="false"
    >
      <div class="btn btn-select">
        <span>选择文件</span>
      </div>
    </UploadContainer>
    <div class="btn btn-clear" @click="onBtnClearClick">
      <span>清空</span>
    </div>
    <div class="btn btn-upload" @click="onBtnUploadClick">
      <span>上传</span>
    </div>

    <div class="file-area">
      <div v-for="(f, i) in files" :key="i">
        <span>{{ f.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import UploadContainer from "../components/upload-container.vue";
export default {
  components: { UploadContainer },
  data() {
    return {
      uploadUrl: "http://220.168.85.72:10910/enterprise/upload-icon",
      // previewUrl: "http://220.168.85.72:10910/enterprise/find-icon",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbGVzIjpbMCwyLDMsNywxMV0sImF1dGhzIjpbWyJBVVRIIiwiUk9MRSIsIlVTRVIiXSxbIkFVVEgiLCJST0xFIl0sWyJBVVRIIiwiUk9MRSJdLFtdLFtdXSwiaWF0IjoxNjgxOTU0MjgwLCJleHAiOjE2ODE5NzU4ODB9.XGisKZPlzmTD4wpDZFgq_0ugKfm5lZ1rvwK6YcBgieI",
      files: [],
    };
  },
  methods: {
    onChange(files) {
      this.files = files;
      const rawFiles = this.files.map((f) => f.rawFile);
      this.$refs["UploadContainer"].SetFiles(rawFiles);
    },
    onBtnClearClick() {
      this.$refs["UploadContainer"].ClearFiles();
    },
    onBtnUploadClick() {
      if (this.files && this.files.length > 0) {
        this.$refs["UploadContainer"].Upload();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.async-upload {
  padding: 32px;
  .btn {
    width: 120px;
    height: 32px;
    line-height: 32px;
    color: white;
    background-color: blue;
    text-align: center;

    &.btn-upload,
    &.btn-clear {
      margin-top: 32px;
      cursor: pointer;
    }
  }

  .file-area {
    margin-top: 32px;
  }
}
</style>