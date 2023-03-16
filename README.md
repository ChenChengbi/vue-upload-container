<!--
 * @Author: Billy
 * @Date: 2023-03-10 10:12:59
 * @LastEditors: Billy
 * @LastEditTime: 2023-03-16 21:40:12
 * @Description: 请输入
-->

# Vue Upload Container

> 基于 Vue 的文件上传容器

## 📦 安装

``` bash
$ npm i vue-upload-container -S
```

## 🔨 使用
```html
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
...
```

## 🔠 属性
| 属性名     | 类型    | 默认值   | 说明                       |
|------------|---------|----------|----------------------------|
| disabled   | Boolean | false    | 点击本组件是否有效         |
| action     | String  | true     | 上传文件的后端服务地址     |
| fileName   | String  | "file"   | 文件对象对应的表单字段名   |
| limit      | Number  | Infinity | 同一批次上传的文件个数限制 |
| minSize    | Number  | Number   | 文件尺寸的最小限制         |
| maxSize    | Number  | Number   | 文件尺寸的最大限制         |
| accept     | String  | -        | 可接受的文件 MIME 类型     |
| autoUpload | Boolean | true     | 是否选好文件后就自动上传   |
| headers    | Object  | {}       | 设置上传的请求头部         |
| extraData  | Object  | {}       | 上传时附带的额外参数       |


## 🔠 钩子属性
| 属性名           | 参数        | 说明                                                                                                                              |
|------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------|
| beforeSelectFile | -           | 选择上传文件之前的钩子，返回 false 将不再弹窗选择文件                                                                             |
| beforeUploadAll  | files       | 上传所有文件之前的钩子，返回 false 将会中止所有文件上传                                                                           |
| beforeUpload     | file, files | 上传单个文件之前的钩子，返回 false 将会中止单个文件上传，返回非 false 则正常上传，并且如果返回对象则对象本身会追加到 extraData 中 |
| onExceedLimit    |             |                                                                                                                                   |
| onExceedMinSize  |             |                                                                                                                                   |
| onExceedMaxSize  |             |                                                                                                                                   |
| onChange         |             |                                                                                                                                   |
| onBegin          |             |                                                                                                                                   |
| onProgress       |             |                                                                                                                                   |
| onSuccess        |             |                                                                                                                                   |
| onError          |             |                                                                                                                                   |