<template>
  <div class="home">
    <UploadClick
      :action="uploadUrl"
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
      <img alt="Vue logo" src="../assets/logo.png" />
    </UploadClick>
  </div>
</template>

<script>
import UploadClick from "../components/upload-click.vue";
export default {
  name: "HomeView",
  components: { UploadClick },
  data() {
    return {
      uploadUrl: "http://220.168.85.72:10910/enterprise/upload-icon",
    };
  },
  methods: {
    beforeSelectFile() {},
    beforeUploadAll(files) {},
    beforeUpload(file, files) {},
    onBegin(file, cancel, extraData) {},
    onChange(files) {},
    onSuccess(result, file, extraData) {},
    onProgress(file, { percent, total }, extraData) {},
    onError(err, file, extraData) {},
    onExceed(files) {},
  },
};
</script>
