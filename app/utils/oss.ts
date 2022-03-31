import OSS from "ali-oss";

const { OSS_ID, OSS_SECRET } = process.env;

const client = new OSS({
  // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: "oss-cn-hangzhou",
  // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  accessKeyId: OSS_ID!,
  accessKeySecret: OSS_SECRET!,
  // 填写Bucket名称。关于Bucket名称命名规范的更多信息，请参见Bucket。
  bucket: "cy-node",
});

export default client;
