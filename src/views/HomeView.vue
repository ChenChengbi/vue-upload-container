<template>
  <div class="home">
    <UploadContainer
      :action="uploadUrl"
      :headers="{ Token: token }"
      :fileName="'icon'"
      :limit="1"
      :maxSize="1024 * 1024"
      :minSize="1024 * 10"
      :beforeSelectFile="beforeSelectFile"
      :beforeUploadAll="beforeUploadAll"
      :beforeUpload="beforeUpload"
      :onExceedLimit="onExceedLimit"
      :onExceedMinSize="onExceedMinSize"
      :onExceedMaxSize="onExceedMaxSize"
      :onChange="onChange"
      :onBegin="onBegin"
      :onProgress="onProgress"
      :onSuccess="onSuccess"
      :onError="onError"
    >
      <div
        class="img-area"
        :style="{ 'background-image': `url(${previewUrl})` }"
      ></div>
    </UploadContainer>
  </div>
</template>

<script>
import UploadContainer from "../components/upload-container.vue";
export default {
  name: "HomeView",
  components: { UploadContainer },
  data() {
    return {
      uploadUrl: "http://220.168.85.72:10910/enterprise/upload-icon",
      previewUrl: "http://220.168.85.72:10910/enterprise/find-icon",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbGVzIjpbMCwyLDMsNywxMV0sImF1dGhzIjpbWyJBVVRIIiwiUk9MRSIsIlVTRVIiXSxbIkFVVEgiLCJST0xFIl0sWyJBVVRIIiwiUk9MRSJdLFtdLFtdXSwiaWF0IjoxNjc4NjkxNDcwLCJleHAiOjE2Nzg3MTMwNzB9.rgtdwZaReMBjc0RJZHjJL-nw5ofq_06QFEPZtYvY_3M",
    };
  },
  methods: {
    beforeSelectFile() {
      console.log("beforeSelectFile");
    },
    beforeUploadAll(files) {
      console.log("beforeUploadAll >> ", files);
    },
    beforeUpload(file, files) {
      console.log("beforeUpload >> ", file, files);
    },
    onExceedLimit(files) {
      console.log("onExceedLimit >> ", files);
    },
    onExceedMinSize(files) {
      console.log("onExceedMinSize >> ", files);
    },
    onExceedMaxSize(files) {
      console.log("onExceedMaxSize >> ", files);
    },
    onChange(files) {
      console.log("onChange >> ", files);
    },
    onBegin(file, cancel, extraData) {
      console.log("onBegin >> ", file, cancel, extraData);
    },
    onProgress(file, { percent, total }, extraData) {
      console.log("onProgress >> ", file, { percent, total }, extraData);
    },
    onSuccess(result, file, extraData) {
      console.log("onSuccess >> ", result, file, extraData);
    },
    onError(err, file, extraData) {
      console.log("onError >> ", err, file, extraData);
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  .img-area {
    width: 100px;
    height: 100px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
}
</style>
