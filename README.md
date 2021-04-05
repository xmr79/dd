# 项目名称

一品杭

# 开发环境部署/安装

1.克隆源代码

git clone git@120.76.251.149:web/Template-antPro.git

2.安装/运行/打包/分析

npm install

npm run start

npm run build

npm run analyze

# 功能支持

1.mock

2.登录功能 文件位置：src\pages\User\Login

注：1.密码有 md5 加密

3.动态菜单

4.路由菜单按钮权限

5.自定义组件

    1) 三级菜单布局

        文件位置：src\components\QLayout\index.js

    2) chart (目前支持 日期统计型折线图表、饼状图)

        文件位置：src\components\Chart

    3) 按钮权限组件

        文件位置：src\components\Auth/AuthBlock

    4) 表单自定义组件

        ① 省市区选择

          文件位置：src\components\FormItems/AreaFormItem

        ② 字数统计Input

          文件位置：src\components\FormItems/InputFormItem

        ③ 密码Input

          文件位置：src\components\FormItems/PasswordFormItem

        ④ 手机号Input

          文件位置：src\components\FormItems/PhoneFormItem

        ⑤ 多图上传

          文件位置：src\components\FormItems/UploadImgsFormItem

# defaultSettings 新增配置

文件位置：config\defaultSettings.js

tokenKey Type: string 缓存 token 的 key

md5Key  
Type: string 缓存 md5 的 key

# CDN 插件

react

bizcharts

data-set

blueimp-md5
