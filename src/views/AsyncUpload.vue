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
    <div class="btn btn-upload" @click="onBtnUploadClick">
      <span>上传</span>
    </div>

    <div class="file-area"></div>
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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbGVzIjpbMCwyLDMsNywxMV0sImF1dGhzIjpbWyJBVVRIIiwiUk9MRSIsIlVTRVIiXSxbIkFVVEgiLCJST0xFIl0sWyJBVVRIIiwiUk9MRSJdLFtdLFtdXSwiaWF0IjoxNjgxODk3NDM3LCJleHAiOjE2ODE5MTkwMzd9.V8PU0BRxWhX2yDgQfr3UpIWEN5VUHmhe7kBF1Ion0ME",
      files: [],
    };
  },
  methods: {
    onChange(files) {
      this.files = files;
    },
    onBtnUploadClick() {
      if (this.files && this.files.length > 0) {
        this.$refs["UploadContainer"].SetFiles(
          this.files.map((f) => f.rawFile)
        );
        this.$refs["UploadContainer"].Upload();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.async-upload {
  .btn {
    width: 120px;
    height: 32px;
    line-height: 32px;
    color: white;
    background-color: blue;

    &.btn-upload {
      margin-top: 32px;
    }
  }
}
</style>