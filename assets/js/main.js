/* ==========================================================================
   公司官网 Demo · 公共脚本
   导航与页脚由脚本统一注入，模拟后台可配置的栏目结构
   ========================================================================== */

/* ---------- 站点配置（模拟后台「导航管理」下发的数据） ---------- */
var SITE = {
  name: '博彦设计',
  nav: [
    { text: '首页', href: 'index.html', key: 'home' },
    {
      text: '客户案例', href: 'cases.html', key: 'cases',
      children: [
        { text: '全部案例', href: 'cases.html' },
        { text: '电商新零售', href: 'cases.html?industry=电商新零售' },
        { text: '金融科技', href: 'cases.html?industry=金融科技' },
        { text: '文娱', href: 'cases.html?industry=文娱' },
        { text: '生活服务', href: 'cases.html?industry=生活服务' },
        { text: '食品酒饮', href: 'cases.html?industry=食品酒饮' },
        { text: '3C 家电', href: 'cases.html?industry=3C家电' },
        { text: '新能源', href: 'cases.html?industry=新能源' },
        { text: '半导体', href: 'cases.html?industry=半导体' }
      ]
    },
    { text: '服务内容', href: 'services.html', key: 'services' },
    { text: 'AIGC 赋能', href: 'aigc.html', key: 'aigc' },
    { text: '关于我们', href: 'about.html', key: 'about' },
    { text: '联系我们', href: 'contact.html', key: 'contact' }
  ],
  cities: ['杭州'],
  services: ['平面视觉', '品牌包装', '图拍视频', 'IP 设计', '整合营销', '品牌设计', 'AIGC', '三维设计'],
  industries: ['电商新零售', '金融科技', '文娱', '生活服务', '食品酒饮', '3C 家电', '新能源', '半导体', '服饰', '大健康', '箱包', '美妆'],
  contact: {
    tel: '1955 0254 115',
    person: '李女士',
    mail: 'lilinhua01@beyondsoft.com',
    company: '博彦设计 · 博彦科技（上市公司）旗下',
    icp: '浙ICP备00000000号',
    police: '浙公网安备 00000000000000号'
  }
};

/* ---------- 合作客户（用于 Logo 墙 / 关于页） ---------- */
var SITE_CLIENTS = ['迪安诊断', '玄铁', '中国银行', '阿里妈妈', '宁德时代', '唐宫夜宴', '蚂蚁集团', '网易云音乐', '支付宝', '网易', '美团', '明康汇', '毕节', '1688', '迷你巴拉', '百度', '阿里', '京东', '天猫', '快手', '虎鲸文娱', '科沃斯', '森马', '平安证券', '沪上阿姨', '小满手工粉', '古茗', '饿了么', '腾讯', '欢聚集团', '淘宝', '海尔'];

/* 客户 logo 图片列表（首页客户墙轮播用） */
var CLIENT_LOGOS = ['client-00','client-02','client-03','client-04','client-05','client-07','client-08','client-09','client-10','client-11','client-12','client-13','client-14','client-15','client-16','client-18','client-19','client-20','client-21','client-22','client-23','client-24','client-25','client-26','client-27','client-28','client-29','client-30'];

/* 通用客户墙轮播渲染：logo 图片版（与首页一致） */
function renderLogoMarquee(id) {
  var box = document.getElementById(id);
  if (!box) return;
  var cells = CLIENT_LOGOS.map(function (f) {
    return '<div class="client-cell"><img src="assets/img/' + f + '.png" alt="合作客户" loading="lazy"></div>';
  }).join('');
  box.innerHTML = '<div class="client-marquee-track">' + cells + cells + '</div>';
}

/* ---------- 客户案例数据（模拟接口返回，供首页/列表/详情共用） ----------
   i = 行业  s = 服务类型  img = 列表缩略图  year = 合作/上线时间 */
var SITE_CASES = [
  { id:'c01', c:'迪安诊断', n:'迪安诊断 · 迪晓智品牌Logo设计', i:'大健康', s:'品牌设计', t:'Logo设计', img:'cases/set1_slide15_image1.jpg', d:'迪安诊断子品牌迪晓智Logo设计，构建智慧检验品牌识别体系' },
  { id:'c02', c:'玄铁', n:'玄铁 · 品牌VI与UI设计体系', i:'半导体', s:'品牌设计', t:'品牌VI', img:'cases/set2_slide31_image176.jpg', d:'玄铁处理器品牌VI体系设计，涵盖Logo、色彩、字体规范及PC端页面' },
  { id:'c03', c:'中国银行', n:'中国银行 · IP盲盒系列设计', i:'金融', s:'包装设计', t:'IP设计', img:'cases/set1_slide27_image1.jpg', d:'中国银行IP盲盒系列设计，融合金融品牌与潮流文化元素' },
  { id:'c04', c:'阿里妈妈', n:'阿里妈妈 · 3D服饰AI库IP延展', i:'电商零售', s:'包装设计', t:'IP延展', img:'cases/set1_slide28_image119.jpg', d:'阿里妈妈3D服饰AI库IP形象延展设计，赋能数字时尚场景' },
  { id:'c05', c:'宁德时代', n:'宁德时代 · 星河IP及icon设计', i:'新能源', s:'包装设计', t:'IP设计', img:'cases/set2_slide30_image174.jpg', d:'宁德时代星河IP形象及App icon设计，诠释新能源科技感' },
  { id:'c06', c:'唐宫夜宴', n:'唐宫夜宴 · IP形象与文创衍生设计', i:'文娱', s:'包装设计', t:'IP设计', img:'cases/set1_slide26_image107.jpg', d:'唐宫夜宴IP形象设计与文创衍生品开发，活化盛唐文化IP' },
  { id:'c07', c:'蚂蚁集团', n:'蚂蚁集团 · H5互动游戏与动效设计', i:'金融科技', s:'整合营销', t:'H5设计', img:'cases/set2_slide17_image100.jpg', d:'蚂蚁集团守护暖冬、财神庙小游戏等系列H5互动及动效设计' },
  { id:'c08', c:'网易云音乐', n:'网易云音乐×荣耀 · MBTI旅拍人格H5', i:'文娱', s:'整合营销', t:'H5设计', img:'cases/set1_slide30_image131.jpg', d:'网易云音乐×荣耀300联名MBTI旅拍人格H5，曝光量超1200万' },
  { id:'c09', c:'支付宝', n:'支付宝 · 中秋互动游戏地图H5', i:'金融科技', s:'整合营销', t:'H5设计', img:'cases/set1_slide31_image1.jpg', d:'支付宝中秋互动游戏地图H5，累计参与用户超2800万，分享率42%' },
  { id:'c10', c:'网易', n:'网易天成 · 我在街角有个它公益H5', i:'文娱', s:'整合营销', t:'H5设计', img:'cases/set1_slide32_image1.jpg', d:'网易天成流浪动物救助公益H5，\"生命唱片\"为核心创意传递温暖' },
  { id:'c11', c:'美团', n:'美团KEETA · 海外市场品牌营销', i:'生活服务', s:'整合营销', t:'整合营销', img:'cases/set2_slide22_image132.jpg', d:'美团KEETA海外市场品牌营销活动视觉设计与推广' },
  { id:'c12', c:'明康汇', n:'明康汇 · 农产品系列包装设计', i:'食品', s:'包装设计', t:'包装设计', img:'cases/set1_slide19_image8.jpg', d:'明康汇农产品及食品系列包装设计，传递新鲜健康品牌理念' },
  { id:'c13', c:'毕节', n:'毕节 · 电商消费季包装设计', i:'电商零售', s:'包装设计', t:'包装设计', img:'cases/set1_slide20_image1.jpg', d:'毕节电商消费季活动包装与系列视觉设计' },
  { id:'c14', c:'1688', n:'1688严选 · 系列产品包装设计', i:'电商零售', s:'包装设计', t:'包装设计', img:'cases/set1_slide21_image1.jpg', d:'1688严选平台多品类产品系列包装设计' },
  { id:'c15', c:'美团', n:'美团 · 快乐猴及小象包装设计', i:'生活服务', s:'包装设计', t:'包装设计', img:'cases/set2_slide21_image124.jpg', d:'美团旗下快乐猴及小象系列产品包装视觉设计' },
  { id:'c16', c:'迷你巴拉', n:'迷你巴拉 · 产品包装及详情页设计', i:'服饰', s:'包装设计', t:'包装设计', img:'cases/set2_slide36_image202.jpg', d:'迷你巴拉童装产品包装及详情页视觉设计' },
  { id:'c17', c:'百度', n:'百度 · 1024程序员节KV设计', i:'科技', s:'平面视觉', t:'KV设计', img:'cases/set1_slide35_image1.jpg', d:'百度1024程序员节活动KV主视觉设计，5年合作TOP1供应商' },
  { id:'c18', c:'百度', n:'百度 · 自驾逛玩主题长图插画', i:'科技', s:'平面视觉', t:'插画设计', img:'cases/set1_slide43_image1.jpg', d:'百度自动驾驶自驾逛玩主题长图插画设计' },
  { id:'c19', c:'百度', n:'百度 · 春日AI充电活动KV', i:'科技', s:'平面视觉', t:'KV设计', img:'cases/set1_slide35_image1.jpg', d:'百度春日AI充电活动KV视觉及系列推广设计' },
  { id:'c20', c:'百度', n:'百度 · 主题头像框插画设计', i:'科技', s:'平面视觉', t:'插画设计', img:'cases/set1_slide46_image1.jpg', d:'百度系App主题头像框系列插画设计' },
  { id:'c21', c:'阿里', n:'阿里巴巴 · 北京新园区开园KV', i:'电商零售', s:'平面视觉', t:'KV设计', img:'cases/set2_slide16_image48.jpg', d:'阿里巴巴北京新园区开园活动KV主视觉设计' },
  { id:'c22', c:'阿里', n:'聚划算 · 欢聚日系列海报设计', i:'电商零售', s:'平面视觉', t:'海报设计', img:'cases/set2_slide16_image48.jpg', d:'聚划算欢聚日系列品牌活动海报视觉设计' },
  { id:'c23', c:'阿里', n:'阿里云智能 · Web3泰国活动KV', i:'科技', s:'平面视觉', t:'KV设计', img:'cases/set2_slide18_image103.jpg', d:'阿里云智能集团Web3泰国活动KV视觉设计' },
  { id:'c24', c:'阿里', n:'阿里云 · 系列营销长图设计', i:'科技', s:'平面视觉', t:'长图设计', img:'cases/set1_slide49_image197.jpg', d:'阿里云系列营销活动长图及视觉物料设计' },
  { id:'c25', c:'阿里', n:'阿里云 · 四折页宣传物料设计', i:'科技', s:'平面视觉', t:'折页设计', img:'cases/set1_slide53_image1.jpg', d:'阿里云产品及服务四折页宣传物料设计' },
  { id:'c26', c:'阿里', n:'阿里妈妈 · M峰会PPT美化设计', i:'电商零售', s:'平面视觉', t:'PPT美化', img:'cases/set1_slide50_image1.jpg', d:'阿里妈妈M峰会演讲PPT视觉美化设计，提升品牌宣讲质感' },
  { id:'c27', c:'阿里', n:'阿里巴巴 · 南湖服务指南三折页', i:'科技', s:'平面视觉', t:'折页设计', img:'cases/set1_slide52_image1.jpg', d:'阿里巴巴控股南湖办公区服务指南三折页设计' },
  { id:'c28', c:'蚂蚁集团', n:'蚂蚁集团 · 可持续发展报告画册', i:'金融科技', s:'平面视觉', t:'画册设计', img:'cases/set1_slide54_image1.jpg', d:'蚂蚁集团可持续发展报告画册设计与排版' },
  { id:'c29', c:'蚂蚁集团', n:'蚂蚁集团 · 上海公交站线下物料', i:'金融科技', s:'平面视觉', t:'线下物料', img:'cases/set1_slide57_image1.jpg', d:'蚂蚁集团上海公交站广告及线下品牌物料设计' },
  { id:'c30', c:'美团', n:'美团闪购 · 版头及活动视觉设计', i:'电商零售', s:'平面视觉', t:'版头设计', img:'cases/set1_slide37_image1.jpg', d:'美团闪购频道版头及大促活动视觉设计' },
  { id:'c31', c:'美团', n:'美团 · 多业务线主视觉设计', i:'生活服务', s:'平面视觉', t:'KV设计', img:'cases/set2_slide20_image121.jpg', d:'美团外卖校招、年货节、夏季战役等多业务主视觉设计' },
  { id:'c32', c:'美团', n:'大众点评 · 松江美食节市集设计', i:'生活服务', s:'平面视觉', t:'线下物料', img:'cases/set1_slide58_image236.jpg', d:'大众点评上海松江美食节市集活动线下物料与空间设计' },
  { id:'c33', c:'美团', n:'大众点评 · 果味休吸站门头设计', i:'生活服务', s:'平面视觉', t:'线下物料', img:'cases/set1_slide59_image250.jpg', d:'大众点评果味休吸站门头及线下空间视觉设计' },
  { id:'c34', c:'京东', n:'京东 · 平台大促与品牌海报设计', i:'电商零售', s:'平面视觉', t:'海报设计', img:'cases/set1_slide42_image1.jpg', d:'京东平台大促及品牌活动系列海报视觉设计' },
  { id:'c35', c:'京东', n:'京东 · 商品详情页店铺设计', i:'电商零售', s:'平面视觉', t:'详情页设计', img:'cases/set1_slide60_image259.jpg', d:'京东平台商品详情页及店铺整体视觉设计' },
  { id:'c36', c:'京东京造', n:'京东京造 · 全品类详情页设计', i:'电商零售', s:'平面视觉', t:'详情页设计', img:'cases/set2_slide25_image157.jpg', d:'京东京造全品类商品详情页视觉设计' },
  { id:'c37', c:'京东健康', n:'京东健康 · 心理测评插画动效设计', i:'大健康', s:'平面视觉', t:'插画设计', img:'cases/set1_slide44_image1.jpg', d:'京东健康心理测评活动插画及GIF动效设计' },
  { id:'c38', c:'1688', n:'1688寻源中国 · 系列海报设计', i:'电商零售', s:'平面视觉', t:'海报设计', img:'cases/set1_slide40_image1.jpg', d:'1688寻源中国系列活动海报视觉设计' },
  { id:'c39', c:'天猫', n:'天猫超市 · 大促海报设计', i:'电商零售', s:'平面视觉', t:'海报设计', img:'cases/set1_slide41_image1.jpg', d:'天猫超市大促及日常品牌活动系列海报设计' },
  { id:'c40', c:'快手', n:'快手 · 15周年庆及丰收中国主视觉', i:'文娱', s:'平面视觉', t:'KV设计', img:'cases/set2_slide27_image168.jpg', d:'快手15周年庆及丰收中国活动主视觉设计' },
  { id:'c41', c:'虎鲸文娱', n:'虎鲸文娱 · 影视剧集页面与海报', i:'文娱', s:'平面视觉', t:'海报设计', img:'cases/set2_slide19_image110.jpg', d:'虎鲸文娱集团Phone端、TV端及PC端影视剧集页面与海报设计' },
  { id:'c42', c:'科沃斯', n:'科沃斯 · 暑期焕新活动KV设计', i:'3C家电', s:'平面视觉', t:'KV设计', img:'cases/set2_slide29_image172.jpg', d:'科沃斯暑期焕新促销活动KV主视觉设计' },
  { id:'c43', c:'森马', n:'森马 · 门店活动视觉设计', i:'服饰', s:'平面视觉', t:'店铺设计', img:'cases/set2_slide37_image208.jpg', d:'森马品牌门店活动视觉及店铺空间设计' },
  { id:'c44', c:'平安证券', n:'平安证券 · 市场热点长图设计', i:'金融', s:'平面视觉', t:'长图设计', img:'cases/set2_slide43_image251.jpg', d:'平安证券市场热点系列长图及海报视觉设计' },
  { id:'c45', c:'沪上阿姨', n:'沪上阿姨 · 品牌招商手册设计', i:'食品', s:'平面视觉', t:'手册设计', img:'cases/set1_slide55_image1.jpg', d:'沪上阿姨品牌招商手册设计与排版' },
  { id:'c46', c:'沪上阿姨', n:'沪上阿姨 · 茶瀑布门店美陈设计', i:'食品', s:'平面视觉', t:'线下物料', img:'cases/set1_slide56_image1.jpg', d:'沪上阿姨茶瀑布门店美陈及线下物料设计' },
  { id:'c47', c:'小满手工粉', n:'小满手工粉 · 菜单及海报设计', i:'食品', s:'平面视觉', t:'海报设计', img:'cases/set1_slide38_image1.jpg', d:'小满手工粉菜单及品牌系列海报设计' },
  { id:'c48', c:'古茗', n:'古茗 · 新品上新系列海报', i:'食品', s:'平面视觉', t:'海报设计', img:'cases/set2_slide32_image182.jpg', d:'古茗茶饮新品上新系列海报视觉设计' },
  { id:'c49', c:'迪安诊断', n:'迪安诊断 · 品牌宣讲PPT美化', i:'大健康', s:'平面视觉', t:'PPT美化', img:'cases/set1_slide51_image1.jpg', d:'迪安诊断品牌宣讲PPT美化设计，提升专业形象' },
  { id:'c50', c:'京东', n:'京东好玩节 · 元宇宙数字人IP设计', i:'电商零售', s:'3D设计', t:'3D设计', img:'cases/set1_slide64_image1.jpg', d:'京东好玩节元宇宙数字人IP设计，涵盖3D虚拟角色与互动场景' },
  { id:'c51', c:'蚂蚁集团', n:'蚂蚁健康岛 · 3D建模场景与动效', i:'金融科技', s:'3D设计', t:'3D设计', img:'cases/set1_slide65_image1.jpg', d:'蚂蚁健康岛3D建模场景及动效设计' },
  { id:'c52', c:'蚂蚁集团', n:'蚂蚁集团 · 系列GIF动画设计', i:'金融科技', s:'3D设计', t:'动画设计', img:'cases/set1_slide66_image1.jpg', d:'蚂蚁集团系列GIF动画设计与动效制作' },
  { id:'c53', c:'饿了么', n:'饿了么 · H5三维动画设计', i:'生活服务', s:'3D设计', t:'3D动画', img:'cases/set1_slide68_image1.jpg', d:'饿了么H5活动三维动画设计与制作' },
  { id:'c54', c:'迪安诊断', n:'迪安诊断 · 智检联域平台网页设计', i:'大健康', s:'UI设计', t:'网页设计', img:'cases/set1_slide70_image1.jpg', d:'迪安诊断智检联域平台网页端UI界面设计' },
  { id:'c55', c:'腾讯', n:'腾讯 · 门户网站页面UI设计', i:'科技', s:'UI设计', t:'网页设计', img:'cases/set1_slide71_image1.jpg', d:'腾讯门户网站页面UI视觉设计' },
  { id:'c56', c:'蚂蚁集团', n:'蚂蚁集团 · 金融类APP界面设计', i:'金融科技', s:'UI设计', t:'APP设计', img:'cases/set1_slide73_image1.jpg', d:'蚂蚁集团金融类APP端UI界面设计，含蚂蚁宝藏联名信用卡等' },
  { id:'c57', c:'蚂蚁集团', n:'蚂蚁集团 · 神奇体验官APP设计', i:'金融科技', s:'UI设计', t:'APP设计', img:'cases/set1_slide74_image1.jpg', d:'蚂蚁集团神奇体验官APP端UI设计' },
  { id:'c58', c:'蚂蚁集团', n:'蚂蚁集团 · 孵化器B端后台UI', i:'金融科技', s:'UI设计', t:'后台设计', img:'cases/set1_slide76_image303.jpg', d:'蚂蚁集团孵化器B端后台管理系统UI设计' },
  { id:'c59', c:'欢聚集团', n:'欢聚集团 · APP端页面UI设计', i:'文娱', s:'UI设计', t:'APP设计', img:'cases/set2_slide40_image233.jpg', d:'欢聚集团旗下产品APP端页面UI设计' },
  { id:'c60', c:'美团', n:'美团优选 · 年货节AIGC插画KV', i:'电商零售', s:'AIGC赋能', t:'AIGC设计', img:'cases/set1_slide80_image1.jpg', d:'美团优选年货节AIGC生成式KV插画设计' },
  { id:'c61', c:'支付宝', n:'支付宝 · AIGC票根弹窗设计', i:'金融科技', s:'AIGC赋能', t:'AIGC设计', img:'cases/set1_slide81_image1.jpg', d:'支付宝北野票根AIGC弹窗视觉设计' },
  { id:'c62', c:'淘宝', n:'淘宝CBU · AIGC虚拟换装界面', i:'电商零售', s:'AIGC赋能', t:'AIGC设计', img:'cases/set1_slide82_image1.jpg', d:'淘宝CBU-AI虚拟换装界面设计' },
  { id:'c63', c:'美团', n:'美团买药 · AIGC养生茶海报', i:'大健康', s:'AIGC赋能', t:'AIGC设计', img:'cases/set1_slide83_image1.jpg', d:'美团买药养生茶系列AIGC海报设计' },
  { id:'c64', c:'蚂蚁集团', n:'蚂蚁集团 · AIGC拆红包动效海报', i:'金融科技', s:'AIGC赋能', t:'AIGC设计', img:'cases/set1_slide84_image1.jpg', d:'蚂蚁集团吃饭打卡拆惊喜红包AIGC动效海报设计' },
  { id:'c65', c:'ZOLOZ', n:'ZOLOZ · 品牌MG宣传动画', i:'金融科技', s:'图拍视频', t:'MG动画', img:'cases/set1_slide86_image1.jpg', d:'蚂蚁旗下ZOLOZ品牌MG宣传动画制作' },
  { id:'c66', c:'阿里', n:'阿里云 · AIGC品牌形象宣传片', i:'科技', s:'图拍视频', t:'宣传片', img:'cases/set1_slide88_image1.jpg', d:'阿里云AIGC品牌形象宣传视频制作' },
  { id:'c67', c:'阿里', n:'阿里云 · 通义AI品牌传播视频', i:'科技', s:'图拍视频', t:'宣传片', img:'cases/set2_slide49_image283.jpg', d:'阿里云通义AI大模型品牌传播宣传视频' },
  { id:'c68', c:'瓴羊', n:'瓴羊 · 阿里巴巴最佳实践宣传片', i:'科技', s:'图拍视频', t:'宣传片', img:'cases/set1_slide87_image1.jpg', d:'瓴羊×阿里巴巴最佳实践品牌宣传片' },
  { id:'c69', c:'阿里', n:'阿里妈妈 · 国家图书馆联名AIGC视频', i:'文娱', s:'图拍视频', t:'宣传片', img:'cases/set2_slide47_image270.jpg', d:'阿里妈妈×国家图书馆联名活动AIGC宣传视频' },
  { id:'c70', c:'阿里', n:'堆友D20 · 3D宣传动画设计', i:'技术服务', s:'图拍视频', t:'动画设计', img:'cases/set2_slide51_image297.jpg', d:'堆友D20 3D宣传动画设计与制作' },
  { id:'c71', c:'天猫', n:'天猫超级品类日 · 混剪视频', i:'电商零售', s:'图拍视频', t:'混剪视频', img:'cases/set1_slide89_image1.jpg', d:'天猫超级品类日营销混剪视频制作' },
  { id:'c72', c:'天猫', n:'天猫618 · 大促混剪视频', i:'电商零售', s:'图拍视频', t:'混剪视频', img:'cases/set1_slide89_image1.jpg', d:'天猫618大促混剪宣传视频' },
  { id:'c73', c:'天猫', n:'天猫冰雪节 · 品牌活动视频', i:'电商零售', s:'图拍视频', t:'活动视频', img:'cases/set1_slide90_image1.jpg', d:'天猫冰雪节品牌活动宣传视频' },
  { id:'c74', c:'天猫', n:'天猫乐活露营节 · 品牌活动视频', i:'电商零售', s:'图拍视频', t:'活动视频', img:'cases/set1_slide90_image1.jpg', d:'天猫乐活露营节品牌活动宣传视频' },
  { id:'c75', c:'京东', n:'京东AVA大会 · 开场概念视频', i:'科技', s:'图拍视频', t:'宣传片', img:'cases/set2_slide45_image259.jpg', d:'京东AVA大会开场概念视频制作' },
  { id:'c76', c:'京东', n:'京东×MCM · 联名品牌活动视频', i:'箱包', s:'图拍视频', t:'活动视频', img:'cases/set2_slide52_image304.jpg', d:'京东×MCM联名品牌活动宣传视频' },
  { id:'c77', c:'宁德时代', n:'宁德时代 · 星河系统宣传片', i:'新能源', s:'图拍视频', t:'宣传片', img:'cases/set2_slide46_image264.jpg', d:'宁德时代星河系统品牌宣传片制作' },
  { id:'c78', c:'支付宝', n:'Alipay HK · 香港支付宝宣传视频', i:'金融', s:'图拍视频', t:'宣传片', img:'cases/set2_slide48_image276.jpg', d:'Alipay HK香港支付宝品牌宣传视频' },
  { id:'c79', c:'科沃斯', n:'科沃斯 · 产品宣传视频', i:'3C家电', s:'图拍视频', t:'宣传片', img:'cases/set2_slide53_image309.jpg', d:'科沃斯智能家居产品宣传视频' },
  { id:'c80', c:'海尔', n:'海尔 · 品牌形象宣传视频', i:'3C家电', s:'图拍视频', t:'宣传片', img:'cases/set2_slide54_image316.jpg', d:'海尔品牌形象宣传视频制作' },
  { id:'c81', c:'伊利', n:'伊利 · 世界杯×营养早餐品牌宣传', i:'大健康', s:'图拍视频', t:'宣传片', img:'cases/set2_slide55_image323.jpg', d:'世界杯赛事期间营养早餐主题品牌宣传视频制作。' },
  { id:'c82', c:'网易严选', n:'网易严选 · 公益活动H5', i:'文娱', s:'整合营销', t:'H5设计', img:'cases/set2_slide38_image218.jpg', d:'网易严选公益活动H5页面设计与开发。' },
  { id:'c83', c:'歙小菊', n:'歙小菊 · IP形象设计', i:'文娱', s:'包装设计', t:'IP设计', img:'cases/set1_slide25_image1.jpg', d:'歙小菊IP形象设计，打造地域文化特色品牌IP。' },
  { id:'c84', c:'世界高球争夺锦标赛', n:'世界高球争夺锦标赛 · 品牌VI', i:'文娱', s:'品牌设计', t:'品牌VI', img:'cases/set1_slide17_image1.jpg', d:'世界高球争夺锦标赛品牌VI设计，塑造国际化赛事形象。' },
  { id:'c85', c:'蚂蚁集团', n:'蚂蚁 · 守护暖冬/财神庙/MAGA互动', i:'金融科技', s:'整合营销', t:'H5设计', img:'cases/set2_slide17_image100.jpg', d:'蚂蚁集团守护暖冬抽签、财神庙小游戏、MAGA互动游戏等系列H5。' }
];

/* 根据 id / 客户名 / 名称取案例（兼容旧链接：?c=客户名 或 ?c=名称） */
function getCase(id) {
  if (!id) return null;
  for (var k = 0; k < SITE_CASES.length; k++) {
    if (SITE_CASES[k].id === id) return SITE_CASES[k];
  }
  for (var k2 = 0; k2 < SITE_CASES.length; k2++) {
    if (SITE_CASES[k2].c === id) return SITE_CASES[k2];
  }
  for (var k3 = 0; k3 < SITE_CASES.length; k3++) {
    if (SITE_CASES[k3].n.indexOf(id) > -1) return SITE_CASES[k3];
  }
  return null;
}

/* 案例视频映射：caseId → assets/videos/ 下的视频文件（来自 PPTX 嵌入视频） */
var CASE_VIDEOS = {}; // 视频已全部移除（2026-08-14 减负）

/* ---------- 新闻资讯数据（模拟接口返回，供列表/详情共用） ----------
   示例资讯：内容为依据公开合作背景撰写的原型示例，上线前请以品牌部正式稿为准 */
var SITE_NEWS = [
  {
    id: 'award-alibaba', d: '2026-08-01', c: '获奖资讯', top: true,
    t: '博彦设计荣获阿里集团年度优秀设计供应商', img: 'case-alibaba.jpg',
    lead: '在阿里集团年度供应商大会上，博彦设计凭借 17 年深度合作与覆盖全域的视觉交付能力，再次获评「年度优秀设计供应商」。',
    body: [
      { p: '8 月 1 日，阿里集团召开年度供应商大会，博彦设计从数百家创意服务供应商中脱颖而出，连续多年获评「年度优秀设计供应商」。' },
      { p: '自 2009 年与阿里建立合作以来，博彦设计已陪伴阿里走过 17 年，累计交付电商大促、品牌活动、官方物料等视觉项目超万项，是阿里年度框架核心供应商之一。' },
      { img: 'case-alibaba.jpg', cap: '阿里集团年度视觉服务部分交付示意' },
      { p: '博彦设计杭州总部 2000+㎡ 交付空间、450+ 设计师团队，支撑了阿里双 11、618 等核心大促的集中式爆发需求。' },
      { p: '此次获奖，是客户对博彦设计「稳定、高效、可规模化」交付能力的再次肯定。' }
    ]
  },
  {
    id: 'aigc-platform', d: '2026-07-18', c: '公司动态',
    t: '博彦设计 AIGC 设计平台全面上线，人均效率提升 50%', img: 'about-aigc.jpg',
    lead: '博彦设计自研 AIGC 辅助设计流程全面落地，实现从创意探索到量产交付的提效，团队 AIGC 工具渗透率已达 100%。',
    body: [
      { p: '7 月 18 日，博彦设计宣布自研 AIGC 辅助设计流程在全公司范围正式上线。' },
      { p: '目前博彦设计 AIGC 工具渗透率已达 100%，覆盖创意发散、草图生成、批量延展、智能校对等关键环节，团队人均设计效率提升约 50%。' },
      { img: 'about-aigc.jpg', cap: '博彦设计 AIGC 辅助设计工作流示意' },
      { p: '博彦设计坚持「AI 辅助、人做主脑」的理念，所有 AIGC 产出均经过四级质量审核，确保品牌调性与合规要求不被稀释。' },
      { p: '后续博彦设计将持续投入 AIGC 与设计管理系统的深度融合。' }
    ]
  },
  {
    id: 'jd-renew', d: '2026-06-30', c: '公司动态',
    t: '博彦设计与京东续签年度框架，连续 10 年蝉联核心供应商', img: 'case-jd-618.jpg',
    lead: '博彦设计与京东达成新一年度框架合作，双方在 618、双 11 等大促视觉上的合作进入第 10 年。',
    body: [
      { p: '6 月 30 日，博彦设计与京东正式续签年度设计服务框架，博彦设计连续 10 年蝉联京东 TOP1 设计供应商。' },
      { p: '十年来，博彦设计为京东累计交付 618、双 11 等大促主视觉及全域延展物料数千项。' },
      { img: 'case-jd-618.jpg', cap: '京东 618 大促主视觉交付示意' },
      { p: '京东方面表示，博彦设计在爆发式需求下的稳定交付与质量一致性，是双方长期合作的基础。' }
    ]
  },
  {
    id: 'view-aigc', d: '2026-06-12', c: '行业观点',
    t: 'AI 时代的设计交付：博彦设计谈 AIGC 在品牌视觉中的落地实践', img: 'about-aigc.jpg',
    lead: '当 AIGC 成为设计行业的标配工具，真正的竞争壁垒从「会不会用」转向「如何用好」。博彦设计分享一线落地经验。',
    body: [
      { p: '过去一年，AIGC 工具在设计行业的渗透率快速走高。但在博彦设计看来，工具普及带来的不是设计师贬值，而是交付标准的整体抬升。' },
      { p: '博彦设计将 AIGC 定位为「放大器」：放大资深设计师的创意产能，而非替代设计判断。' },
      { h: '三个落地原则' },
      { p: '其一，建立品牌资产库，让 AI 在可控范围内生成；其二，四级 QA 守门关，AI 产出必须过审；其三，把省下的时间投入到策略与创意上。' },
      { p: '正是这套方法，让博彦设计在 AIGC 全面渗透后，依然保持 98% 的项目一次验收通过率。' }
    ]
  },
  {
    id: 'award-intl', d: '2026-05-28', c: '获奖资讯',
    t: '博彦设计作品入围 2026 国际数字创意大奖', img: 'case-kuaishou.jpg',
    lead: '博彦设计选送的文娱行业互动作品入围 2026 国际数字创意大奖（示例资讯，最终奖项以主办方公布为准）。',
    body: [
      { p: '5 月 28 日，2026 国际数字创意大奖公布入围名单，博彦设计选送的文娱行业互动设计作品成功入围（示例资讯，最终奖项以主办方公布为准）。' },
      { img: 'case-kuaishou.jpg', cap: '入围作品所属项目视觉示意' },
      { p: '该作品服务于某头部文娱客户的大型庆典活动，融合 H5 互动与动效叙事。' },
      { p: '博彦设计表示，将持续在互动体验与品牌叙事的结合上投入探索。' }
    ]
  },
  {
    id: 'chengdu', d: '2026-05-09', c: '公司动态',
    t: '博彦设计成都交付中心扩建，中西部产能再升级', img: 'about-team.jpg',
    lead: '随着业务量增长，博彦设计成都交付中心完成扩建，进一步夯实全国多中心交付网络。',
    body: [
      { p: '5 月 9 日，博彦设计成都交付中心完成场地扩建与团队扩容，强化中西部地区的本地化交付能力。' },
      { p: '博彦设计已在杭州、大连、成都、武汉、西安、郑州设立交付中心，形成覆盖全国的协同网络。' },
      { img: 'about-team.jpg', cap: '博彦设计交付团队工作场景（示意）' },
      { p: '多中心布局让博彦设计能够灵活调配资源，应对客户跨地域、跨时区的并发需求。' }
    ]
  },
  {
    id: 'view-young', d: '2026-04-21', c: '行业观点',
    t: '消费品牌年轻化的三个视觉误区', img: 'case-guming.jpg',
    lead: '年轻化不是「加个潮词、换张炫图」。博彦设计结合食品、文娱等行业实战，梳理三个常见视觉误区。',
    body: [
      { h: '误区一：把「花哨」当「年轻」' },
      { p: '年轻人要的是态度共鸣，不是信息过载。视觉克制反而更显高级。' },
      { h: '误区二：忽视渠道适配' },
      { p: '同一套主视觉直接搬运到短视频、电商详情、线下物料，往往水土不服。' },
      { h: '误区三：IP 形象脱离产品' },
      { p: 'IP 不是吉祥物摆设，必须与产品使用场景绑定才能产生粘性。' },
      { img: 'case-guming.jpg', cap: '食品行业年轻化视觉实践示意' },
      { p: '博彦设计在服务古茗、冰茶等食品客户时，始终以「渠道 + 场景」双维度反推视觉策略。' }
    ]
  },
  {
    id: 'brandday', d: '2026-04-02', c: '公司动态',
    t: '博彦设计亮相 2026 中国品牌日，分享全链路品牌服务经验', img: 'hero.jpg',
    lead: '博彦设计受邀参加 2026 中国品牌日系列活动，围绕「全链路品牌视觉服务」进行分享。',
    body: [
      { p: '4 月 2 日，博彦设计受邀参加 2026 中国品牌日系列活动，分享在包装设计、平面视觉、图拍视频领域的全链路服务经验。' },
      { img: 'hero.jpg', cap: '博彦设计品牌服务全景（示意）' },
      { p: '依托博彦科技上市公司背景与 500+ 设计师团队，博彦设计已为阿里、美团、京东、百度、快手等头部客户提供服务。' },
      { p: '博彦设计表示，未来将持续以「设计 + 技术」双引擎，助力中国品牌走向更广阔的市场。' }
    ]
  },
  {
    id: 'view-cost', d: '2026-03-18', c: '行业观点',
    t: '好设计是生意，坏设计是成本｜博彦设计观察', img: 'case-food-pkg.jpg',
    lead: '当视觉表达跟不上产品实力，品牌付出的不是设计费，而是被低估的市场代价。',
    body: [
      { p: '很多企业把设计当作「成本项」，能省则省。但换个角度看：好设计是能直接换算成生意的——更高的点击、更快的转化、更强的品牌溢价。' },
      { p: '博彦设计服务头部企业十六年，见过太多「产品很好、视觉拖后腿」的案例：货架上的三秒钟，包装输了；信息流里的半秒钟，海报输了。' },
      { img: 'case-food-pkg.jpg', cap: '包装设计：货架上的三秒钟怎么赢' },
      { h: '设计的本质是投资' },
      { p: '我们把设计看作客户的资产：一次做对，长期复用。这也是为什么博彦设计坚持四重把关——交付的每一稿，都先过自己四道关。' },
      { p: '好设计是生意，坏设计是成本。这句话，值得每一个做品牌的企业认真算一算。' }
    ]
  },
  {
    id: 'view-package', d: '2026-02-26', c: '行业观点',
    t: '包装设计的生意经：货架上的 3 秒钟，怎么赢？', img: 'case-food-pkg.jpg',
    lead: '消费者在货架前停留平均不到 3 秒，包装就是品牌在这 3 秒里唯一的销售员。',
    body: [
      { p: '在电商和线下渠道并行的今天，包装早已不只是「把产品装起来」——它是品牌的第一触点，也是转化率的第一道闸门。' },
      { p: '博彦设计在包装设计上有一套自己的方法：先想清楚「谁在什么场景下看到它」，再决定颜色、结构与卖点层级，而不是先画图。' },
      { img: 'case-food-pkg.jpg', cap: '博彦设计包装案例示意' },
      { h: '三个被忽视的细节' },
      { p: '其一，货架距离：远看要认得出品牌；其二，手持体验：拿起来的重量和手感会说话；其三，拆箱记忆：开箱那一刻，是用户愿意拍照分享的瞬间。' },
      { p: '包装设计的生意经，说到底是三个字：被记住。' }
    ]
  }
];

/* 根据 id 取新闻 */
function getNews(id) {
  for (var k = 0; k < SITE_NEWS.length; k++) if (SITE_NEWS[k].id === id) return SITE_NEWS[k];
  return null;
}

/* ---------- 工具 ---------- */
function q(s, r) { return (r || document).querySelector(s); }
function qa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function param(k) {
  var m = new RegExp('[?&]' + k + '=([^&]*)').exec(location.search);
  return m ? decodeURIComponent(m[1]) : '';
}

/* ---------- 注入顶部导航 ---------- */
function buildHeader() {
  var cur = document.body.getAttribute('data-page') || '';
  var dark = document.body.getAttribute('data-nav') === 'dark';

  var menu = SITE.nav.map(function (n) {
    var sub = '';
    if (n.children) {
      sub = '<div class="dropdown">' +
        n.children.map(function (c) { return '<a href="' + c.href + '">' + c.text + '</a>'; }).join('') +
        '</div>';
    }
    return '<div class="nav-item' + (cur === n.key ? ' active' : '') + '">' +
      '<a class="nav-link" href="' + n.href + '">' + n.text +
      (n.children ? '<i class="caret"></i>' : '') + '</a>' + sub + '</div>';
  }).join('');

  var html =
    '<nav class="nav' + (dark ? ' on-dark' : ' solid') + '" id="siteNav">' +
      '<div class="nav-inner">' +
        '<a class="logo" href="index.html">' +
          '<span class="logo-txt">' + SITE.name + '</span>' +
        '</a>' +
        '<div class="nav-menu">' + menu + '</div>' +
        '<div class="nav-cta">' +
          '<button class="btn btn-primary btn-sm js-consult" data-from="导航栏">免费咨询</button>' +
          '<button class="hamburger" id="btnMenu" aria-label="打开菜单">' +
            '<span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>' +
    '</nav>';

  var drawerItems = SITE.nav.map(function (n) {
    if (!n.children) {
      return '<div class="drawer-item"><a class="drawer-top" href="' + n.href + '">' + n.text + '</a></div>';
    }
    return '<div class="drawer-item">' +
      '<div class="drawer-top js-drawer-toggle">' + n.text + '<i class="plus">+</i></div>' +
      '<div class="drawer-sub">' +
        '<a href="' + n.href + '">' + n.text + '首页</a>' +
        n.children.map(function (c) { return '<a href="' + c.href + '">' + c.text + '</a>'; }).join('') +
      '</div></div>';
  }).join('');

  html += '<div class="drawer" id="drawer">' +
      '<button class="drawer-close" id="btnClose" aria-label="关闭菜单">&times;</button>' +
      drawerItems +
      '<div class="drawer-foot"><button class="btn btn-primary js-consult" data-from="移动端抽屉">免费咨询</button></div>' +
    '</div>';

  document.body.insertAdjacentHTML('afterbegin', html);
  if (!dark) document.body.style.paddingTop = '72px';
}

/* ---------- 注入页脚 ---------- */
function buildFooter() {
  /* 客户案例列：精简为 4 个入口，避免页脚过长 */
  var caseLinks = (SITE.nav[1].children || []).slice(0, 4).map(function (c) {
    return '<a href="' + c.href + '">' + c.text + '</a>';
  }).join('');
  /* 服务内容列：三大主营 + AIGC */
  var svcLinks = [
    '<a href="services.html">平面视觉</a>',
    '<a href="services.html">图拍视频</a>',
    '<a href="services.html">包装设计</a>',
    '<a href="aigc.html">AIGC 赋能</a>'
  ].join('');
  var aboutLinks =
    '<a href="about.html">公司简介</a>' +
    '<a href="about.html#join">加入我们</a>' +
    '<a href="contact.html">联系我们</a>';

  var html =
  '<section class="cta-band">' +
    '<div class="ph is-dark" data-label="背景图占位 · 建议 1920×420 · 深色调品牌视觉"></div>' +
    '<div class="wrap cta-inner">' +
      '<h3>获取品牌定制化服务</h3>' +
      '<p>说明您的项目诉求，我们会在 1 个工作日内与你联系</p>' +
      '<button class="btn btn-primary js-consult" data-from="页脚CTA通栏">马上联系</button>' +
    '</div>' +
  '</section>' +
  '<footer class="footer">' +
    '<div class="wrap">' +
      '<div class="foot-brand">' +
        '<div class="foot-brand-left">' +
          '<div class="foot-logo">' + SITE.name + '</div>' +
          '<p>一站式视觉整合方案服务商 · 深耕设计行业 18 年</p>' +
        '</div>' +
        '<div class="foot-brand-right">' +
          '<div><span>商务热线</span><a href="tel:19550254115">1955 0254 115（李女士）</a></div>' +
          '<div><span>公司邮箱</span><a href="mailto:lilinhua01@beyondsoft.com">lilinhua01@beyondsoft.com</a></div>' +
        '</div>' +
      '</div>' +
      '<div class="foot-top">' +
        '<div class="foot-col"><h4>客户案例</h4>' + caseLinks + '</div>' +
        '<div class="foot-col"><h4>服务内容</h4>' + svcLinks + '</div>' +
        '<div class="foot-col"><h4>关于我们</h4>' + aboutLinks + '</div>' +
        '<div class="foot-col">' +
          '<h4>关注我们</h4>' +
          '<div class="foot-qr">' +
            '<div class="qr"><img src="assets/img/xhs-qr.png" alt="小红书二维码"><p>小红书</p></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="foot-bottom">' +
        '<div>&copy; 2026 ' + SITE.name + ' · 隶属<a href="https://www.beyondsoft.com/" target="_blank" rel="noopener">博彦科技</a>（上市公司）旗下，版权所有</div>' +
        '<div>' +
          '<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">' + SITE.contact.icp + '</a>' +
          ' &nbsp;|&nbsp; <a href="#">' + SITE.contact.police + '</a>' +
          ' &nbsp;|&nbsp; <a href="#">隐私政策</a>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</footer>' +

  '<div class="float-panel">' +
    '<div class="fp-head">立享专业咨询</div>' +
    '<div class="fp-qr">' +
      '<div class="fp-qr-img"><img src="assets/img/xhs-qr.png" alt="小红书二维码"></div>' +
      '<div class="fp-qr-label">小红书扫码</div>' +
    '</div>' +
    '<div class="fp-divider"></div>' +
    '<div class="fp-row"><span class="fp-label">商务热线</span><a class="fp-val" href="tel:19550254115">1955 0254 115（李女士）</a></div>' +
    '<div class="fp-row"><span class="fp-label">公司邮箱</span><a class="fp-val" href="mailto:lilinhua01@beyondsoft.com">lilinhua01@beyondsoft.com</a></div>' +
    '<button class="fp-btn js-consult" data-from="侧边悬浮面板">售前留言</button>' +
  '</div>' +
  '<button class="float-top" id="toTop" aria-label="返回顶部">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>' +
  '</button>' +

  '<div class="modal" id="consultModal">' +
    '<div class="modal-mask js-modal-close"></div>' +
    '<div class="modal-box">' +
      '<button class="modal-close js-modal-close">&times;</button>' +
      '<div id="modalForm">' +
        '<h3>免费咨询</h3>' +
        '<p class="sub">留下联系方式，商务顾问将在 1 个工作日内与你沟通</p>' +
        '<form class="form-grid" id="leadForm" novalidate>' +
          '<div class="form-item"><label>姓名 <span class="req">*</span></label>' +
            '<input type="text" name="name" placeholder="请输入您的称呼">' +
            '<div class="form-err">请填写姓名</div></div>' +
          '<div class="form-item"><label>邮箱 / 电话 <span class="req">*</span></label>' +
            '<input type="text" name="contact" placeholder="请输入邮箱或手机号">' +
            '<div class="form-err">请填写邮箱或手机号</div></div>' +
          '<div class="form-item full"><label>留言内容</label>' +
            '<textarea name="message" placeholder="简单描述您的需求"></textarea></div>' +
          '<div class="form-item full">' +
            '<button type="submit" class="btn btn-primary">提交咨询</button></div>' +
        '</form>' +
      '</div>' +
      '<div class="modal-ok" id="modalOk" style="display:none">' +
        '<div class="tick">&#10003;</div>' +
        '<h3>提交成功</h3>' +
        '<p class="sub">我们已收到你的需求，商务顾问会尽快联系你</p>' +
      '</div>' +
    '</div>' +
  '</div>';

  document.body.insertAdjacentHTML('beforeend', html);
}

/* ---------- 交互绑定 ---------- */
function bindEvents() {
  var nav = q('#siteNav');

  // 滚动改变导航底色 + 回顶按钮
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('scrolled', y > 40);
    var t = q('#toTop');
    if (t) t.classList.toggle('show', y > 480);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 移动端抽屉
  var drawer = q('#drawer');
  var btnMenu = q('#btnMenu');
  var btnClose = q('#btnClose');
  if (btnMenu) btnMenu.onclick = function () { drawer.classList.add('open'); document.body.style.overflow = 'hidden'; };
  if (btnClose) btnClose.onclick = function () { drawer.classList.remove('open'); document.body.style.overflow = ''; };
  qa('.js-drawer-toggle').forEach(function (el) {
    el.onclick = function () { el.parentNode.classList.toggle('open'); };
  });

  // 回顶
  var toTop = q('#toTop');
  if (toTop) toTop.onclick = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // 咨询弹窗
  var modal = q('#consultModal');
  function openModal(from) {
    q('#modalForm').style.display = '';
    q('#modalOk').style.display = 'none';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.setAttribute('data-from', from || '');
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('.js-consult') : null;
    if (t) { e.preventDefault(); openModal(t.getAttribute('data-from')); }
    if (e.target.classList && e.target.classList.contains('js-modal-close')) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // 表单校验
  var form = q('#leadForm');
  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();
      var ok = true;
      var items = qa('.form-item', form);
      items.forEach(function (i) { i.classList.remove('error'); });

      var name = form.name.value.trim();
      if (!name) { form.name.closest('.form-item').classList.add('error'); ok = false; }

      var contact = form.contact.value.trim();
      if (!contact) { form.contact.closest('.form-item').classList.add('error'); ok = false; }

      if (!ok) return;

      // 保存咨询记录到 localStorage
      var record = {
        id: Date.now(),
        name: name,
        contact: contact,
        message: form.message.value.trim(),
        source: modal.getAttribute('data-from') || '',
        time: new Date().toLocaleString('zh-CN', {timeZone:'Asia/Shanghai'})
      };

      var records = [];

var HOME_SERVICES = [
  { n:'平面视觉', en:'Graphic & Brand Visual', main:true, skills:['海报设计','开机屏设计','版头设计','红包封面','活动KV','插画设计','长图设计','PPT美化','电子杂志','营销手册','H5','商品详情页'] },
  { n:'图拍视频', en:'Film & Video', main:true, skills:['企业宣传片','TVC','短视频','动画设计','动效制作','产品视频','产品拍摄','人物拍摄','场景拍摄','微距拍摄'] },
  { n:'包装设计', en:'Packaging Design', main:true, skills:['新品全案产品策略','礼盒设计','商场促销包装','农产品包装','食品饮品包装','日用品包装','宠物用品包装','母婴产品包装'] },
  { n:'整合营销', en:'Integrated Marketing', main:false, skills:['传播策略','品牌营销','产品策略','内容营销','公关传播','热点事件','活动策划','新媒体矩阵','PR 投放'] },
  { n:'品牌设计', en:'Brand Design', main:false, skills:['logo 设计','品牌 VI 设计','线下活动物料','营销与广告素材设计','品牌故事与传播内容'] },
  { n:'IP 文创', en:'Cultural Creative', main:false, skills:['IP 形象设计','衍生品设计','专属礼品','电子图书','IP 联名','创意漫画','周边策划','3D 建模'] },
  { n:'三维设计', en:'3D Design', main:false, skills:['线下美陈场景','展示展厅效果图','数字虚拟人','元素设计','Banner 设计','IP 动画'] },
  { n:'UI 设计', en:'User Interface', main:false, skills:['交互设计','app & 小程序设计','网站设计','PC 后台系统','数据大屏'] },
  { n:'AIGC', en:'AI Generated Art', main:false, skills:['内容策划','图生视频','文生图','视频剪辑','动画与 3D 模型','AI 数字人','数据可视化'] }
];

var renderSvcGrid = function(containerId, mini) {
  var box = document.getElementById(containerId);
  if (!box) return;
  box.innerHTML = HOME_SERVICES.map(function (s, i) {
    var skillsHtml = (s.skills || []).map(function(sk) { return '<span>' + sk + '</span>'; }).join('');
    var cls = mini ? 'svc-mini' : '';
    return '<div class="svc-card ' + cls + (s.main ? ' svc-featured' : '') + '" data-idx="' + i + '">' +
      (mini ? '<span class="svc-idx">' + (i < 9 ? '0' + (i + 1) : i + 1) + '</span>' : '') +
      '<h3 class="svc-name">' + s.n + '</h3>' +
      (mini ? '<div class="svc-en">' + s.en + '</div>' : '') +
      '<div class="svc-skills">' + skillsHtml + '</div>' +
    '</div>';
  }).join('');
}
      try {
        var saved = localStorage.getItem('beyondsoft_leads');
        if (saved) records = JSON.parse(saved);
      } catch(e) {}
      records.unshift(record);
      // 最多保留 500 条
      if (records.length > 500) records = records.slice(0, 500);
      localStorage.setItem('beyondsoft_leads', JSON.stringify(records));

      q('#modalForm').style.display = 'none';
      q('#modalOk').style.display = '';
    };
  }

  // 进场动效（观察当前所有 .rv，含 JS 渲染后新增的）
  revealAll();
}

/* 观察所有 .rv 元素（渲染后调用，避免新元素永远 opacity:0） */
function revealAll() {
  var els = qa('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) {
      if (!el.classList.contains('in')) io.observe(el);
    });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }
  /* 兜底：1.2s 后仍未显示的直接显示（防止 IO 异常导致页面空白） */
  setTimeout(function () {
    qa('.rv').forEach(function (el) { el.classList.add('in'); });
  }, 1200);
}

/* ---------- 首页轮播 ---------- */
function initHero() {
  var slides = qa('.hero-slide');
  if (!slides.length) return;
  var dots = qa('.hero-dots i');
  var i = 0, timer = null;

  function go(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('active', k === i); });
    dots.forEach(function (d, k) { d.classList.toggle('active', k === i); });
  }
  function play() { timer = setInterval(function () { go(i + 1); }, 5000); }
  function stop() { clearInterval(timer); }

  dots.forEach(function (d, k) { d.onclick = function () { stop(); go(k); play(); }; });
  var pv = q('.hero-arrow.prev'), nx = q('.hero-arrow.next');
  if (pv) pv.onclick = function () { stop(); go(i - 1); play(); };
  if (nx) nx.onclick = function () { stop(); go(i + 1); play(); };
  var hero = q('.hero');
  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', play);
  go(0); play();
}

/* ---------- 启动 ---------- */
/* 数据加载策略：优先拉取远程 data/cases.json（后台上传即时生效），
   失败或不可用时回退到内置 SITE_CASES（离线兜底） */
function loadRemoteCases() {
  return fetch('data/cases.json?v=' + Date.now(), { cache: 'no-store' })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (list) {
      if (!Array.isArray(list) || !list.length) throw new Error('empty');
      // 合并：远程数据覆盖内置数据（保留内置作为 fallback 引用）
      SITE_CASES.length = 0;
      Array.prototype.push.apply(SITE_CASES, list);
      return true;
    })
    .catch(function () { return false; });
}

document.addEventListener('DOMContentLoaded', function () {
  buildHeader();
  buildFooter();
  bindEvents();
  initHero();
  // 立即渲染页面内容（不依赖远程数据）
  if (window.pageInit) window.pageInit();
  // 渲染完成后重新观察 .rv（包含 JS 新增元素）
  revealAll();
  // 远程数据加载完成后刷新案例列表（后台上传即时生效）
  loadRemoteCases().then(function (ok) {
    if (ok && window.pageInit) window.pageInit();
    revealAll();
  });
});
