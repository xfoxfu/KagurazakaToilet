无性别卫生间分享计划
=====

计划范围：中国大陆

计划目标：标识所有无性别卫生间

计划宗旨：方便可♂爱的男孩子

数据
-----

[沈阳](liaoning_shenyang.geojson)

提交
-----

目前阶段，你可以 Fork 我们的仓库并修改对应的 `.geojson` 数据，提交 Pull Request 合并回本仓库。

为了加速 Pull Request 的合并速度，你可以在提交 Pull Request 未收到响应的三天后向 <coderfox.fu@gmail.com> 发送邮件：

```
Title: [KagurazakaToilet] Please merge pull request #xxxxxx
Recipients: coderfox.fu@gmail.com
```

标准
-----

### 文件

`.geojson` 文件应当存储在根目录下，以「省份_城市」命名，如 `liaoning_shenyang.geojson`、`beijing.geojson`。

厕所的附图应当存储在 `res/img/view` 文件夹中。

### 颜色

颜色对应 GeoJson 的 `properties/marker-color` 字段。

|类型     |颜色Hex |颜色备注             |说明                              |
|---------|--------|---------------------|----------------------------------|
|自由+自由|#4CAF50 |Material Green 500   |处于可以自由访问的区域，厕所不收费|
|自由+收费|#CDDC39 |Material Lime 500    |处于可以自由访问的区域，厕所收费  |
|收费+免费|#FFEB3B |Material Yellow 500  |处于需要收费访问的区域，厕所不收费|
|收费+收费|#FF9800 |Material Orange 500  |处于需要收费访问的区域，厕所收费  |
|受限     |#F44336 |Material Red 500     |处于受限访问的区域                |
|未考察   |#9E9E9E |Material Grey 500    |缺少详细数据或图片                |

备注：*未考察* 的优先级高于其他，即凡是缺少具体数据的均应视为「未考察」。

### 符号

符号对应 GeoJson 的 `properties/marker-symbol` 字段。

|类型  |名称    |说明            |
|------|--------|----------------|
|残疾人|disabled|属于残疾人卫生间|
|无性别|toilets |属于无性别卫生间|
|未考察|toilets |暂未考察的卫生间|


### 大小

大小对应 GeoJson 的 `properties/marker-size` 字段。

|类型    |大小  |说明                  |
|--------|------|----------------------|
|优秀体验|large |具有非常美好的换装体验|
|较好体验|medium|具有普通的换装体验    |
|垃圾体验|small |具有垃圾的换装体验    |
|未考察  |medium|暂未考察的卫生间      |

### 描述

|名称        |说明                         |
|------------|-----------------------------|
|位置        |厕所的地址说明，如何找到厕所 |
|外部环境图  |厕所外的图片，附相对 url 即可|
|内部环境图  |厕所内的图片，附相对 url 即可|
|所在区域价格|公共/收费（标注价格）/限制   |
|厕所价格    |免费/收费（标注价格）        |
|镜子        |✓（有）/✗（无）/○（未考察）|
|台子        |✓（有）/✗（无）/○（未考察）|
|备注        |厕所的备注                   |

### 提交

提交分为以下类型：

**增加** 增加新的卫生间标注

```
ADD: [xxxxx_xxxxx] xxxxx.xxx,xxxxx.xxx
```

**补全** 增加卫生间标注的具体信息

```
MODIFY: [xxxxx_xxxxx] xxxxx.xxx,xxxxx.xxx
```

**修订** 修改卫生间信息的错误

```
MODIFY: [xxxxx_xxxxx] xxxxx.xxx,xxxxx.xxx
```

**删除** 删除错误的卫生间

```
DELETE: [xxxxx_xxxxx] xxxxx.xxx,xxxxx.xxx
```

此处 `xxxxx_xxxxx` 为城市，参考前文「文件名称」方式命名。

此处 `xxxxx.xxx` 均为地理经纬度，纬度在前，经度在后。

一次性添加多个卫生间的，以 *增加* 为例：

```
ADD: [xxxxx_xxxxx] 5 toilets

xxxxx.xxx,xxxxx.xxx
xxxxx.xxx,xxxxx.xxx
xxxxx.xxx,xxxxx.xxx
xxxxx.xxx,xxxxx.xxx
xxxxx.xxx,xxxxx.xxx
```

如果一次性增加的为多个城市的卫生间，请拆分为多个 commit。

合作
-----

我们欢迎各位加入到本项目的工作中，帮助我们审核 Pull Request！请发邮件到 <coderfox.fu@gmail.com>：

```
Title: [KagurazakaToilet] Collaboration Request
Recipients: coderfox.fu@gmail.com

Content:
  GitHub ID: @xxxxxxxx
  Personal Introduction: xxxxxxxxxxxxx
```

发布协议
-----

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Dataset" property="dct:title" rel="dct:type">KagurazakaToilet</span> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/coderfox/KagurazakaToilet" property="cc:attributionName" rel="cc:attributionURL">无性别卫生间分享计划</a> 创作，采用 <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">知识共享 署名-相同方式共享 4.0 国际 许可协议</a>进行许可。
