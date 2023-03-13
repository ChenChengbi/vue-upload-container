<template>
  <div class="home">
    <UploadContainer
      :action="uploadUrl"
      :headers="{ Token: token }"
      :fileName="'icon'"
      :beforeSelectFile="beforeSelectFile"
      :beforeUploadAll="beforeUploadAll"
      :beforeUpload="beforeUpload"
      :onBegin="onBegin"
      :onChange="onChange"
      :onSuccess="onSuccess"
      :onProgress="onProgress"
      :onError="onError"
      :onExceed="onExceed"
    >
      <div class="img-container">
        <img :src="previewUrl" />
      </div>
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
      console.log("beforeUploadAll");
    },
    beforeUpload(file, files) {
      console.log("beforeUpload");
    },
    onBegin(file, cancel, extraData) {
      console.log("onBegin");
    },
    onChange(files) {
      console.log("onChange");
    },
    onSuccess(result, file, extraData) {
      console.log("onSuccess");
    },
    onProgress(file, { percent, total }, extraData) {
      console.log("onProgress");
    },
    onError(err, file, extraData) {
      console.log("onError");
    },
    onExceed(files) {
      console.log("onExceed");
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  .img-container {
    width: 200px;
    img {
      width: 100%;
    }
  }
}
</style>
