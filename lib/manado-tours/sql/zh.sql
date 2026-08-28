-- manado.tours — terjemahan `zh`
-- Dibuat build-sql.py dari source.json + translations/zh.json
-- 127 pernyataan. Aman dijalankan berulang (ON DUPLICATE KEY UPDATE).
-- Setelah impor, 34 dari 34 paket lolos gerbang terbit `zh`.

SET NAMES utf8mb4;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
START TRANSACTION;

-- paket 8: 4d3n-manado-highlights-tour
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '8', 'zh', '美娜多精华之旅 4 日', '<ul><li data-list-item-id="e471204a79d04f381b4df48abd3568538">根据团队人数安排的全程空调车</li><li data-list-item-id="e5b23337d0965051bf73eab7da059f4d6">前往<strong>布纳肯岛&nbsp;</strong>的专属快艇</li><li data-list-item-id="ee8b3c0ce962717687e5c7022da4a5338">所选酒店 3 晚住宿 – 双床房/大床房（两人一间）</li><li data-list-item-id="eb352e4cf3b88e05f28979629bdbb9af3">经验丰富的导游 &amp; 司机</li><li data-list-item-id="e15fdff726b9e0d6b7522d89e853d30c7">景点门票 &amp; 停车费</li><li data-list-item-id="eea1816d36947b4e805dd272a628cdf0e">行程内所列餐食</li><li data-list-item-id="eb97366b44df314dee7b6f99ac3ca6044">按行程表提供的旅游服务</li><li data-list-item-id="e15fff39ee2756b1703ce5cb3c6a898cf">矿泉水 每人每天 1 瓶</li><li data-list-item-id="e96b7b72b91c673e978df24be855f3346">接待服务</li></ul>', '<ul><li data-list-item-id="e1dc181d36af8406f97796d1769568909">往返机票</li><li data-list-item-id="e71726909053b640df3cf3fad15a8fa02">导游 &amp; 司机小费</li><li data-list-item-id="e11be5b6ad773248b059620b238aee9b8">自选行程</li><li data-list-item-id="e2d93bfcb857f4cecda93f3d73f2629ee">套餐外个人消费（额外餐饮等）</li><li data-list-item-id="ef7dd221a222f7b6c5b9e01cefa4cc2e4">行李搬运服务、机场税 &amp; 超重行李费</li><li data-list-item-id="ebadfd3cab7dc05d402522ac0ce442654">个人消费（洗衣、迷你吧、客房服务等）</li><li data-list-item-id="e81328aad0a1b986831eed337f4f20e9b">旅游保险</li><li data-list-item-id="e59c4a681478a9f8e689ec94ec3db1a1d">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 9: 4d3n-manado-island-gateway
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '9', 'zh', '美娜多海岛门户 4 日', '<ul><li data-list-item-id="e471204a79d04f381b4df48abd3568538">根据团队人数安排的全程空调车</li><li data-list-item-id="e5b23337d0965051bf73eab7da059f4d6">前往<strong>布纳肯岛 &amp; 利哈加岛</strong>的专属快艇</li><li data-list-item-id="ee8b3c0ce962717687e5c7022da4a5338">所选酒店 3 晚住宿 – 双床房/大床房（两人一间）</li><li data-list-item-id="eb352e4cf3b88e05f28979629bdbb9af3">经验丰富的导游 &amp; 司机</li><li data-list-item-id="e15fdff726b9e0d6b7522d89e853d30c7">景点门票 &amp; 停车费</li><li data-list-item-id="eea1816d36947b4e805dd272a628cdf0e">行程内所列餐食</li><li data-list-item-id="eb97366b44df314dee7b6f99ac3ca6044">按行程表提供的旅游服务</li><li data-list-item-id="e15fff39ee2756b1703ce5cb3c6a898cf">矿泉水 每人每天 1 瓶</li><li data-list-item-id="e96b7b72b91c673e978df24be855f3346">接待服务</li></ul>', '<ul><li data-list-item-id="e1dc181d36af8406f97796d1769568909">往返机票</li><li data-list-item-id="e71726909053b640df3cf3fad15a8fa02">导游 &amp; 司机小费</li><li data-list-item-id="e11be5b6ad773248b059620b238aee9b8">自选行程</li><li data-list-item-id="e2d93bfcb857f4cecda93f3d73f2629ee">套餐外个人消费（额外餐饮等）</li><li data-list-item-id="ef7dd221a222f7b6c5b9e01cefa4cc2e4">行李搬运服务、机场税 &amp; 超重行李费</li><li data-list-item-id="ebadfd3cab7dc05d402522ac0ce442654">个人消费（洗衣、迷你吧、客房服务等）</li><li data-list-item-id="e81328aad0a1b986831eed337f4f20e9b">旅游保险</li><li data-list-item-id="e59c4a681478a9f8e689ec94ec3db1a1d">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 10: 5d4n-tropical-wonders-of-manado
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '10', 'zh', '美娜多热带奇景 5 日', '<ul><li data-list-item-id="eea05a0fde3c9ad132dbf48ce720f5561">根据团队人数安排的全程空调车</li><li data-list-item-id="e35785e5ddfb6a5dbd4ed40faf695693a">前往<strong>布纳肯岛 &amp; 利哈加岛</strong>的专属快艇</li><li data-list-item-id="e11a26ee9d49a5ac1820047c130a6dfd5">所选酒店 4 晚住宿 – 双床房/大床房（两人一间）</li><li data-list-item-id="ed5854fe627dc7e654934ab1e976947b9">经验丰富的导游 &amp; 司机</li><li data-list-item-id="e81a3939bb0ae47c432179a015b5820f9">景点门票 &amp; 停车费</li><li data-list-item-id="eabab84f65a739c80174326ae687d6b04">行程内所列餐食</li><li data-list-item-id="ecc87f33179f708ea4e88eab3be33ec4b">按行程表提供的旅游服务</li><li data-list-item-id="e103e760176de41ca65afc60d31e98ff4">矿泉水 每人每天 1 瓶</li><li data-list-item-id="ef790cc1f991b5e82333a286a94bd3e06">接待服务</li></ul>', '<ul><li data-list-item-id="ef5d685346305b0f7f7808e0b74584d12">往返机票</li><li data-list-item-id="e94d1cf8dad2496875a013333c9a2fb20">导游 &amp; 司机小费</li><li data-list-item-id="e78256fbdd7f99f311466b507bd7703f6">自选行程</li><li data-list-item-id="e3cd0374398d870ebbfd590981eab8338">套餐外个人消费（额外餐饮等）</li><li data-list-item-id="e863d09a2873702f66d5a57da029388d2">行李搬运服务、机场税 &amp; 超重行李费</li><li data-list-item-id="ec55c74e4c2067333dd4c54aa28d879f1">个人消费（洗衣、迷你吧、客房服务等）</li><li data-list-item-id="ee355dc061e586232a936ec63b0305405">旅游保险</li><li data-list-item-id="e321a09c3a477e2305453ecd7e331735d">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 11: 4d3n-exotic-manado-explorer
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '11', 'zh', '异域美娜多探索 4 日', '<ul><li data-list-item-id="e11c918e1af328b6b0e6bd2c3d6c46e5d">根据团队人数安排的全程空调车</li><li data-list-item-id="ebc2761735faa295be9869faeba5ef9c3">前往利哈加岛的专属快艇</li><li data-list-item-id="e1f7e9ade1181eb30404b6c4f7263c2b1">所选酒店 3 晚住宿 – 双床房/大床房（两人一间）</li><li data-list-item-id="ebbdb40dd9308cc6ba65794e075cced2f">经验丰富的导游 &amp; 司机</li><li data-list-item-id="e2279728b3feae8fdd9a4669a3cecffd3">景点门票 &amp; 停车费</li><li data-list-item-id="e827fd57d3a5e570b5b508c9fc5e721fa">行程内所列餐食</li><li data-list-item-id="e8468f13ea9c16c3b266d42594e607992">按行程表提供的旅游服务</li><li data-list-item-id="e10fb1ed65e37365dbfff95f53601fbdb">矿泉水 每人每天 1 瓶</li><li data-list-item-id="ed4846e433289ae5057f860554a9f6f0d">接待服务</li></ul>', '<ul><li data-list-item-id="ef8f2361176c16ceca608dff85850a599">往返机票</li><li data-list-item-id="ea8a90f748b0acc8d8c682bc6aba46c8f">导游 &amp; 司机小费</li><li data-list-item-id="e018e34ac8cbe045803a46d616e48d4aa">自选行程</li><li data-list-item-id="ed2e1a8df37b435a7b0217ea2351babdd">套餐外个人消费（额外餐饮等）</li><li data-list-item-id="e0b26c90da4e226af6c485c66f215a053">行李搬运服务、机场税 &amp; 超重行李费</li><li data-list-item-id="e892a7a71628c913e7c40d29cad4c8939">个人消费（洗衣、迷你吧、客房服务等）</li><li data-list-item-id="eb026a0cc55dc3225736ba4099fbe22c9">旅游保险</li><li data-list-item-id="e0d7036afa0726248cfb0462f1cd28859">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 12: 3d2n-manado-bliss-gateway
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '12', 'zh', '美娜多高原逃逸 3 日', '<ul><li data-list-item-id="e8e6883a6e56a2407f008c457746ff1b6">根据团队人数安排的全程空调车</li><li data-list-item-id="e8de14905ae06a64f87cc60b7707f22d0">所选酒店 2 晚住宿 – 双床房/大床房（两人一间）</li><li data-list-item-id="e4bb6b6d5246389f96275d7a9a8a82136">行程内所列餐食</li><li data-list-item-id="eea1dca8498d90beff0733fbed2b12b77">经验丰富的导游 &amp; 司机</li><li data-list-item-id="ec02237fe232f55cc706fb1297ad87fad">景点门票 &amp; 停车费</li><li data-list-item-id="ed6a3feef8a8add362060ccd621024e6d">按行程表提供的旅游服务</li><li data-list-item-id="ec668e506dcb5e72b186b8387ab536b9a">矿泉水 每人每天 1 瓶</li><li data-list-item-id="e532893443396609a2ad9f6b124a36b95">接待服务</li></ul>', '<ul><li data-list-item-id="e3b523e8375ebb8c9d79946b95b626000">往返机票</li><li data-list-item-id="ebb59df0fa48ba937a21926c9d7e1f3dd">导游 &amp; 司机小费</li><li data-list-item-id="e3ce39bff4df98057a82869976df231d7">自选行程</li><li data-list-item-id="e3f219b92323c9770103f518bec22b1ba">套餐外个人消费（额外餐饮等）</li><li data-list-item-id="e11ba73fd8e73eef138f3ca4ad9edebf4">行李搬运服务、机场税 &amp; 超重行李费</li><li data-list-item-id="ec1219e9200318981e942067b191d0e19">个人消费（洗衣、迷你吧、客房服务等）</li><li data-list-item-id="eeb6d510ef8ff5842d69e6e91a30b5aa4">旅游保险</li><li data-list-item-id="e0bf84136b233377c9c534be5adbe9757">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 13: 3d2n-manado-highland-escape
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '13', 'zh', '美娜多悠享假期 3 日', '<ul><li data-list-item-id="e06181f8916c033d055bf431ea9bb507d">根据团队人数安排的全程空调车</li><li data-list-item-id="ec74f2f93cf89580ce2eba2c1def0a181">前往<strong>布纳肯岛</strong>的专属快艇</li><li data-list-item-id="e8e4a93b41c7a6ed50ed3813194bd6e59">所选酒店 2 晚住宿 – 双床房/大床房（两人一间）</li><li data-list-item-id="e91c056088dcfc8c669ef740833e245c5">行程内所列餐食</li><li data-list-item-id="e065c54e6af38a7ad1bd490f01b5b5818">经验丰富的导游 &amp; 司机</li><li data-list-item-id="ee0e35b2c23993c0791e055d49f1f6f9d">景点门票 &amp; 停车费</li><li data-list-item-id="e76df34d52a6a29e995f5d9be291dd79b">按行程表提供的旅游服务</li><li data-list-item-id="e620b8eda8fdcede4f1fbaf8c0908a778">矿泉水 每人每天 1 瓶</li><li data-list-item-id="e2640041a620be5c0b2575af63aa0074e">接待服务</li></ul>', '<ul><li data-list-item-id="e6fe90ccd0d08c5ebfa1c0966f14e1e37">往返机票</li><li data-list-item-id="ee405bf5b6e9984c12726b290bcf96832">导游 &amp; 司机小费</li><li data-list-item-id="e54a6f1381c6ba9c3e26eb7685fcccedb">自选行程</li><li data-list-item-id="e202c477f749dc16522c760ea26ce63fe">套餐外个人消费（额外餐饮等）</li><li data-list-item-id="e3eee6b6c5ec03bcbabcb277307efbc5f">行李搬运服务、机场税 &amp; 超重行李费</li><li data-list-item-id="edd02c634ddc4057311fbdaabd045c0cb">个人消费（洗衣、迷你吧、客房服务等）</li><li data-list-item-id="e054a8fc0bec74542de93820aa5038d72">旅游保险</li><li data-list-item-id="ed8953b086fc7833fe1607e7f3df48f49">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 14: paragliding-adventure-at-mount-tumpa
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '14', 'zh', '通帕山滑翔伞探险', '<ul><li data-list-item-id="ea1013fe641dbc74405bab4a89c5269d4">专业滑翔伞教练</li><li data-list-item-id="e270763c5cc1b5c10062db7e71349a127">景点门票</li><li data-list-item-id="e0c8e90b12db6655ee96a9b9c53a48929">按行程提供的旅游服务</li></ul>', '<ul><li data-list-item-id="e09808b568f0f7cf8b77bb2460fbf04c1">机票</li><li data-list-item-id="e7861cd3a295b5e9e7e7e32ec1bb61a65">车辆（接送）自选</li><li data-list-item-id="eb8cd71ddf1d59066b0fe144c54b66278">机场税</li><li data-list-item-id="e571d4f230715ed2fbe507807bb77544d">行李搬运&nbsp;</li><li data-list-item-id="e11238ef8ad6bdc98761802c20dafcd49">酒店</li><li data-list-item-id="edcff8a0aeff894bd3a8e1024cb208edb">导游</li><li data-list-item-id="e68946d32764504f4bc586c60286973e8">司机小费</li><li data-list-item-id="ed0f9917e71858b2d5a6c5bc0a3788568">自选行程</li><li data-list-item-id="ea0fb1478644b3360fcfc07c2524c963e">行程外的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 15: tarsius-canoe-adventure-highland-sunset
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '15', 'zh', '眼镜猴独木舟探险 & 高原日落', '<ul><li data-list-item-id="e7bc9e1165c9336d08f046154ec23b677">根据参团人数安排的全程空调车</li><li data-list-item-id="ea7af70bb2a82bcea77255af2e5bee5f8">经验丰富的红树林向导及司机</li><li data-list-item-id="eae204140fa5bb1dcce46af8f50941376">独木舟</li><li data-list-item-id="e80f346479d08bc79ba631e2cd3b91eb6">景点门票&nbsp;</li><li data-list-item-id="e464bfce6ecdcffccb9875ff5346cfc6b">停车费</li><li data-list-item-id="e276d3b05d37581d3fd4159c5dd2f2075">每人 1 瓶矿泉水</li><li data-list-item-id="e285b78b0ee79f6f91b8f1fc2b17ac847">按行程提供的旅游服务</li></ul>', '<ul><li data-list-item-id="e08be48cb4f21a5377ce9748c0ca49109">机票</li><li data-list-item-id="ed90b677285985025078bdb06a9cf6c45">机场税</li><li data-list-item-id="ea142622087caa49b2ff7e4c53a07b979">行李搬运</li><li data-list-item-id="eb25e5a10849163e000f250df28b0b66d">餐食</li><li data-list-item-id="e6afc882721d3368dc426447ed90c3af0">酒店</li><li data-list-item-id="edb5d4d26a2cfe5fde84d5a34dde54592">导游 &amp; 司机小费</li><li data-list-item-id="eab39da60f0dd66cad430d5382fc5acdc">自选行程</li><li data-list-item-id="e4ce6a2be042d0929991d5051e57283ca">行程外的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 16: tangkoko-nature-reserve-tour-tunan-waterfall
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '16', 'zh', '唐科科自然保护区之旅 & 图南瀑布', '<ul><li data-list-item-id="e3a6d5c7a95824505fcc7169d19c68b06">根据参团人数安排的全程空调车</li><li data-list-item-id="ec6d02de779b3cf721615c06630e5b3a2">唐科科自然保护区护林员</li><li data-list-item-id="eed59092e3fde448a5e5a4fb756ab6e44">经验丰富的导游及司机</li><li data-list-item-id="e1fbf9e5db829006a3fc211fef7a86ec5">景点门票</li><li data-list-item-id="ec1827a81cbe7feb5e6c155dc5f41899e">停车费</li><li data-list-item-id="eb65edb1a96b3c032f8f825315f9c7209">午餐</li><li data-list-item-id="e5971d7bd5ebcae0985b7b12074916355">每人 1 瓶矿泉水</li><li data-list-item-id="ef7e51ca1230476f54d606b374973afb1">按行程提供的旅游服务</li></ul>', '<ul><li data-list-item-id="ed1003d6a37aa7b1fbafe39f48ba09598">机票</li><li data-list-item-id="e9101a0e59598b6ff7f1e74ede3ede14f">机场税</li><li data-list-item-id="efd4176d12238c02b80f1e80ada630810">行李搬运</li><li data-list-item-id="ea6ec6622fd640f8ae2aff46bc2e3b6e6">酒店，&nbsp;</li><li data-list-item-id="ee0e2b05c5dcca53d84e69986e0eec301">导游及司机小费</li><li data-list-item-id="e5de631515d01a36e9bf58f056fac2003">自选行程</li><li data-list-item-id="eebc3a63adc6760f98d268bc5875c1aac">行程外的任何其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 17: mt-lokon-volcano-trek
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '17', 'zh', '洛孔火山徒步', '<ul><li data-list-item-id="e9e914bf2ff11c00c2a9db3b87ca22efe">根据参团人数安排的全程空调车</li><li data-list-item-id="e680c0b8aea08452cbae884c6d5e2d572">经验丰富的导游及司机</li><li data-list-item-id="ebca155750890997c3be20cf7a2196305">景点门票</li><li data-list-item-id="e8d8fd8ee171bb996d9ee4419d568d989">停车费</li><li data-list-item-id="e8b60764be181f21f1778af2b47681999">午餐</li><li data-list-item-id="ec2d301ad37ffc7057334aefa9fe2257e">每人 1 瓶矿泉水</li><li data-list-item-id="e041e6dc48bc42dd9524a3df956c00c0c">按行程提供的旅游服务</li></ul>', '<ul><li data-list-item-id="e97188319fb5536c010e7d1ddc597336f">机票</li><li data-list-item-id="e23e09bdcb623c333c317c7b6299f8759">机场税</li><li data-list-item-id="e83a0664f8844283c0c4348456a9dfb3b">行李搬运</li><li data-list-item-id="e1bd92c6b00cb5ea95a1c37639c97543e">酒店</li><li data-list-item-id="ef148c59f0c1f718ac34fb13f0e1dbe4a">导游及司机小费</li><li data-list-item-id="e8cb793f90a845b4dfd6bf1f1b2b42a80">自选行程</li><li data-list-item-id="e763128880b466113267e760ee5d194f5">行程外的任何其他费用。</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 18: mt-mahawu-volcano-tetetana-hill
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '18', 'zh', '马哈乌火山 & 特特塔纳山丘', '<ul><li data-list-item-id="ee0a07c9cb24323f7ce891a99fae8befb">根据参团人数安排的全程空调车</li><li data-list-item-id="e2294b9fea85a5bb7b3c381229d996538">经验丰富的导游及司机、景点门票</li><li data-list-item-id="e91b0f8f940b1ae9746f796b2399f0b12">停车费</li><li data-list-item-id="e68c9ac84e6c7d75451eaf1e0bd591748">午餐</li><li data-list-item-id="e1a2d571799de05d946edbf79052260d1">每人 1 瓶矿泉水</li><li data-list-item-id="eeeb894126a0e2667e1c122b8daf2a097">按行程提供的服务</li></ul>', '<ul><li data-list-item-id="ed040cc0dd81d42e795600e22a7bf6536">机票</li><li data-list-item-id="eb2e43bfc1813f79cdda31725bf97dbad">机场税</li><li data-list-item-id="eec4c3bc7fb908919a5b66c97cde714e5">行李搬运</li><li data-list-item-id="ef13b7599a238bc82e6bd5620370064d9">酒店</li><li data-list-item-id="e7a50082855dcc93d44a0d8bbcef795bb">导游及司机小费</li><li data-list-item-id="e2a39ca8ecbefd244e7980a1f24d1bb28">自选行程</li><li data-list-item-id="efae7355dae9278ce19d7a043661cdfd1">行程外的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 19: white-water-rafting
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '19', 'zh', '激流漂流', '<ul><li data-list-item-id="e8f9892615252c1f7113eb1af6758e23d">根据参团人数安排的全程空调车</li><li data-list-item-id="ea3a96d847da9f813d56ea1bf5e5091f0">经验丰富的导游及司机</li><li data-list-item-id="e5f704714c2138eff93abd9ef0b451e7c">漂流装备及护具</li><li data-list-item-id="ebef7f400e0d2a286c3753c27ac6b35d5">景点门票</li><li data-list-item-id="ee7e8a9cdd869251eacb4fee991736ba1">停车费</li><li data-list-item-id="e51ee15f118665b0e2d33ac03bf6150d0">每人 1 瓶矿泉水</li><li data-list-item-id="e25c6d77eec5df59483c0f7d94f7d0753">按行程提供的服务</li></ul>', '<ul><li data-list-item-id="e64a5c48756da8949a84fc99be24bd499">机票</li><li data-list-item-id="e0b3182e85d9f33acc157b85808347961">机场税</li><li data-list-item-id="e2cb5bdd5ecfc46fcb144d67bfbd8950f">餐食</li><li data-list-item-id="ef1153321326a82f3288f350ea4e12772">行李搬运</li><li data-list-item-id="e6657bb1483ae99b0ac50275b9a92fefa">酒店</li><li data-list-item-id="e90f5a9e0c8775eae0dd396d234c2ca6e">导游及司机小费</li><li data-list-item-id="e1bc758f69c0ff547e5c8f8aca100c99e">自选行程</li><li data-list-item-id="ed4f1470355a4f65f457a776a07b216c9">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 20: minahasa-highland-tour
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '20', 'zh', '米纳哈萨高原之旅', '<ul><li data-list-item-id="e3a6d5c7a95824505fcc7169d19c68b06">根据参团人数安排的全程空调车</li><li data-list-item-id="eed59092e3fde448a5e5a4fb756ab6e44">经验丰富的导游及司机</li><li data-list-item-id="e1fbf9e5db829006a3fc211fef7a86ec5">景点门票</li><li data-list-item-id="ec1827a81cbe7feb5e6c155dc5f41899e">停车费</li><li data-list-item-id="eb65edb1a96b3c032f8f825315f9c7209">午餐</li><li data-list-item-id="e5971d7bd5ebcae0985b7b12074916355">每人 1 瓶矿泉水</li><li data-list-item-id="ef7e51ca1230476f54d606b374973afb1">按行程提供的旅游服务</li></ul>', '<ul><li data-list-item-id="ed1003d6a37aa7b1fbafe39f48ba09598">机票</li><li data-list-item-id="e9101a0e59598b6ff7f1e74ede3ede14f">机场税</li><li data-list-item-id="efd4176d12238c02b80f1e80ada630810">行李搬运</li><li data-list-item-id="ea6ec6622fd640f8ae2aff46bc2e3b6e6">酒店，&nbsp;</li><li data-list-item-id="ee0e2b05c5dcca53d84e69986e0eec301">导游及司机小费</li><li data-list-item-id="e5de631515d01a36e9bf58f056fac2003">自选行程</li><li data-list-item-id="eebc3a63adc6760f98d268bc5875c1aac">行程外的任何其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 21: bunaken-island-sightseeing-tour
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '21', 'zh', '布纳肯岛观光之旅', '<ul><li data-list-item-id="e756cec54195116ff096865a21781571f"><p style="text-align:justify;">前往布纳肯岛的专属快艇</p></li><li data-list-item-id="e00ba750ae031939e7c8465d501457022"><p style="text-align:justify;">经验丰富的导游 &amp; 船员</p></li><li data-list-item-id="ed4121d16075b5d5f88c9d38af15c2a27"><p style="text-align:justify;">景点门票</p></li><li data-list-item-id="e2332fcb6ed90ad0ae25b1e33e756583a"><p style="text-align:justify;">当地餐厅午餐</p></li><li data-list-item-id="ec3c758171f7de84f46c858a794205a03"><p style="text-align:justify;">每人 1 瓶矿泉水</p></li><li data-list-item-id="e8ced0664ba420cfbfb7f957585b5e359"><p style="text-align:justify;">按行程表提供的旅游服务</p></li></ul>', '<ul><li data-list-item-id="e64a5c48756da8949a84fc99be24bd499">机票</li><li data-list-item-id="eeec1cfc460047b34d98ccaa46e7a7e79">陆路交通（轿车）</li><li data-list-item-id="e0b3182e85d9f33acc157b85808347961">机场税</li><li data-list-item-id="e2cb5bdd5ecfc46fcb144d67bfbd8950f">餐食</li><li data-list-item-id="ef1153321326a82f3288f350ea4e12772">行李搬运</li><li data-list-item-id="e6657bb1483ae99b0ac50275b9a92fefa">酒店</li><li data-list-item-id="e90f5a9e0c8775eae0dd396d234c2ca6e">导游及司机小费</li><li data-list-item-id="e1bc758f69c0ff547e5c8f8aca100c99e">自选行程</li><li data-list-item-id="ed4f1470355a4f65f457a776a07b216c9">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 22: manado-city-tour-luch-with-manados-special-dishes
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '22', 'zh', '美娜多市区之旅 & 美娜多特色风味午餐', '<ul><li data-list-item-id="efa0326736a93dbe5b6f2f4886719f0ae"><p style="text-align:justify;">根据参团人数安排的空调车</p></li><li data-list-item-id="e6f7c213ce63967da3a7674f798318146"><p style="text-align:justify;">经验丰富的导游（英语导游）&amp; 司机</p></li><li data-list-item-id="e31e949b88b66a13c31a285d2ea0fe01b"><p style="text-align:justify;">门票 &amp; 停车费</p></li><li data-list-item-id="e5d9e0c346d759e5a38f90442bd7731c9"><p style="text-align:justify;">当地餐厅午餐</p></li><li data-list-item-id="e7b7a00f1ee67b67ec041223e00f34a09"><p style="text-align:justify;">每人 1 瓶矿泉水</p></li><li data-list-item-id="e364d522edd138b4fa0906d7379169caa"><p style="text-align:justify;">按行程提供的旅游服务</p></li></ul>', '<ul><li data-list-item-id="e64a5c48756da8949a84fc99be24bd499">机票</li><li data-list-item-id="e0b3182e85d9f33acc157b85808347961">机场税</li><li data-list-item-id="e2cb5bdd5ecfc46fcb144d67bfbd8950f">餐食</li><li data-list-item-id="ef1153321326a82f3288f350ea4e12772">行李搬运</li><li data-list-item-id="e6657bb1483ae99b0ac50275b9a92fefa">酒店</li><li data-list-item-id="e90f5a9e0c8775eae0dd396d234c2ca6e">导游及司机小费</li><li data-list-item-id="e1bc758f69c0ff547e5c8f8aca100c99e">自选行程</li><li data-list-item-id="ed4f1470355a4f65f457a776a07b216c9">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 23: 6d5n-tangkoko-adventure-tour
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '23', 'zh', '唐科科探险之旅 6 日', '<ul><li data-list-item-id="e003cb081df381c6177f6f6ea22e70670">全程空调车&nbsp;</li><li data-list-item-id="e0d5c6e19f840ce309c7c0f35dcfac3f4">前往布纳肯岛的专属快艇</li><li data-list-item-id="e4364960109bee572d3a8d9cae7ce2e96">酒店 5 晚住宿，两人一间</li><li data-list-item-id="e406c6b2a303d8fc371e9e36db30336f9">经验丰富的导游 &amp; 司机</li><li data-list-item-id="ea83df9e88b4d60410713905d99b0773e">景点门票 &amp; 停车费</li><li data-list-item-id="ea0513d38795aacb231a0d76a6e389665">按旅游行程提供的餐食</li><li data-list-item-id="e1d347a24ac609ef4c151d1e191962bad">按行程提供的旅游服务</li><li data-list-item-id="e03a02e72cc81325190c8b5844feec80c">每人每天 1 瓶矿泉水</li><li data-list-item-id="e38650055baf01af92b30e8be7c0377e6">接待服务</li></ul>', '<ul><li data-list-item-id="eb5eba377a627536111f5daaf42cb875e">往返机票</li><li data-list-item-id="e9871e63b9fbb46e8e849ba04f66112b4">导游 &amp; 司机小费</li><li data-list-item-id="e141f97d4f43b25648e15d80a691fd2d7">自选行程</li><li data-list-item-id="ecbb5c50e20d10d1311cd91fb730a72f6">套餐外额外消费（额外餐饮等）</li><li data-list-item-id="ed9e6b7e4a9ad9f99209d34216e79ff72">行李搬运、机场税 &amp; 超重行李</li><li data-list-item-id="ee8836b89a60e07a22d2e2038bc73b07d">个人消费（洗衣、迷你吧、客房服务等）</li><li data-list-item-id="e5dda5c1a16091383138fef6dd26df6ee">旅游保险</li><li data-list-item-id="ed1693c3ccea40a446251d042c65b75e9">行程外的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 24: tangkoko-adventure-4d3n
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '24', 'zh', '唐科科探险 4 日', '<ul><li data-list-item-id="ef32c0bfe5795561b9ab193cd44c60a01">根据参团人数安排的全程空调车</li><li data-list-item-id="e8b6758ced173cafd33eeb47088587315">唐科科 2 晚 &amp; 托莫洪 1 晚（大床房/双床房）</li><li data-list-item-id="e3b802aad9f6aaa8677df1b6542b2b753">经验丰富的司机 &amp; 导游</li><li data-list-item-id="e0430266106efc4c83295f481a66a272e">唐科科自然保护区护林员</li><li data-list-item-id="e6263d3892d15802d1cdbba1e1483fc4b">景点门票 &amp; 停车费</li><li data-list-item-id="e41e80b8e04edeabc44a8949d6f46e507">按旅游行程表提供的餐食</li><li data-list-item-id="e9424305b5471b1307a625f1e394473d3">按行程提供的旅游服务</li><li data-list-item-id="e5160d2919b1850eff838c550505ea428">每天 2 瓶矿泉水</li><li data-list-item-id="e7c5227391081bd816bd247709adc2fb1">接待服务</li></ul>', '<ul><li data-list-item-id="eab8e19d9005d7b92a3b55f83e6c406d5">往返机票</li><li data-list-item-id="ec89859e61ce5257e8ce597e8b9ed8f95">司机 &amp; 导游小费</li><li data-list-item-id="eef1817701ed7d1b37d70094c2cf03414">自选行程</li><li data-list-item-id="ecc81655adf3b9e759353573a80d75f4b">套餐外费用（额外餐饮等）</li><li data-list-item-id="e36914624471dc30595049484fcb9c27e">行李搬运、机场税 &amp; 超重行李</li><li data-list-item-id="e0d1bbfc33f8e55265033264d9643f777">个人消费（洗衣、迷你吧、客房服务等）</li><li data-list-item-id="e581cc90534790d4f6be55537e1415302">旅游保险</li><li data-list-item-id="ee3f094b58737eb29f43eb8a3427ef690">以及行程外的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 25: tangkoko-adventure-3d2n
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '25', 'zh', '唐科科探险 3 日', '<ul><li data-list-item-id="eb8cd28a724737ab44cc88dd97a389dbe">根据参团人数安排的全程空调车</li><li data-list-item-id="e9bac968587895ffae01f8d49356df8d4">唐科科 2 晚（大床房/双床房）</li><li data-list-item-id="e48aac6bce52fc7428359e501ff729bba">经验丰富的司机 &amp; 导游</li><li data-list-item-id="ed9fed75b7d0562e8bdb0b2bc32232277">唐科科自然保护区护林员</li><li data-list-item-id="efc3381224ecde3190b545ad3376102fe">景点门票 &amp; 停车费</li><li data-list-item-id="e41e80b8e04edeabc44a8949d6f46e507">按行程提供的餐食</li><li data-list-item-id="e6d5acca76e2686e9f57b3b7b6aaf5f65">按行程提供的旅游服务</li><li data-list-item-id="ef45128991ca24a9ae216cd6a2ce70a4a">每天 2 瓶矿泉水</li><li data-list-item-id="ea837f120d87ebda8df3ec40c685d6f66">接待服务</li></ul>', '<ul><li data-list-item-id="e6b416fd5c6f77881ce45c46173dd1108">往返机票</li><li data-list-item-id="ee0319e1248ebd87095dad0bfd8c7d9c9">司机 &amp; 导游小费</li><li data-list-item-id="eb78e7ef31eabb5138ac00798e975cc2f">&nbsp;自选行程</li><li data-list-item-id="e7da4c8edc74e8fafda56c7e6740a2611">套餐外费用（额外餐饮等）</li><li data-list-item-id="ed04c16639d33ef42e9159fc2d3d121c5">行李搬运、机场税 &amp; 超重行李</li><li data-list-item-id="eefc6702e5083bfaff7b21c733acbf043">个人消费（洗衣、迷你吧、客房服务等）</li><li data-list-item-id="e0f2b3f55047546e4fdbba7daadab0de1">旅游保险</li><li data-list-item-id="ecc2d015d15e7b1ce5bbbd590e43ce691">以及行程外的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 26: island-hopping-paradise-bunaken-siladen-nain-escape
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '26', 'zh', '跳岛天堂：布纳肯、西拉登 & 纳因', '<ul><li data-list-item-id="e873d778fd1724e641963f19753bd7153">前往 3 座岛屿的专属快艇</li><li data-list-item-id="e7f8a545844508ac34789fff54c3bf4ec">经验丰富的导游 &amp; 船员</li><li data-list-item-id="e837639ed702b4b3d563d754b9784f201">景点门票</li><li data-list-item-id="eb3047ce26dd07cba53731a349833c934">停车费</li><li data-list-item-id="e17952c91bc59d3bf5bd394db5c31eba2">午餐</li><li data-list-item-id="e8b809428954656d954fcd1a9e186a600">每人 1 瓶矿泉水</li><li data-list-item-id="e8b6d227b6ff4563e99f57d10b0c0fa1b">按行程表提供的旅游服务</li></ul>', '<ul><li data-list-item-id="e8b156627fb0192d631973d4400759fd2">陆路交通（轿车）&nbsp;</li><li data-list-item-id="e64a5c48756da8949a84fc99be24bd499">往返机票</li><li data-list-item-id="e0b3182e85d9f33acc157b85808347961">机场税</li><li data-list-item-id="e2cb5bdd5ecfc46fcb144d67bfbd8950f">餐食</li><li data-list-item-id="ef1153321326a82f3288f350ea4e12772">行李搬运</li><li data-list-item-id="e6657bb1483ae99b0ac50275b9a92fefa">酒店</li><li data-list-item-id="e90f5a9e0c8775eae0dd396d234c2ca6e">导游及司机小费</li><li data-list-item-id="e1bc758f69c0ff547e5c8f8aca100c99e">自选行程</li><li data-list-item-id="ed4f1470355a4f65f457a776a07b216c9">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 27: mount-soputan-trekking-experience
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '27', 'zh', '索普坦火山徒步体验', '<ul><li data-list-item-id="ebd5f16f959211ad8d39562d748703cf6"><p style="text-align:justify;">根据参团人数安排的全程空调车</p></li><li data-list-item-id="ebd2a4a0200f3a42f13270b474708c55f"><p style="text-align:justify;">经验丰富的导游及司机</p></li><li data-list-item-id="ea5540f1e4a6b85032cac1556af6c1e67"><p style="text-align:justify;">景点门票</p></li><li data-list-item-id="ea7600709e3961af862f436ab5c48d340"><p style="text-align:justify;">停车费 &amp; 捐赠费&nbsp;</p></li><li data-list-item-id="e768ef758df3cfe68e0bef8f3aa45bebf"><p style="text-align:justify;">每人 1 瓶矿泉水&nbsp;</p></li><li data-list-item-id="e1f5a44dadf559c86177cde9fc918bc0b"><p style="text-align:justify;">按行程提供的旅游服务</p></li></ul>', '<ul><li data-list-item-id="e64a5c48756da8949a84fc99be24bd499">机票</li><li data-list-item-id="e0b3182e85d9f33acc157b85808347961">机场税</li><li data-list-item-id="e2cb5bdd5ecfc46fcb144d67bfbd8950f">餐食</li><li data-list-item-id="ef1153321326a82f3288f350ea4e12772">行李搬运</li><li data-list-item-id="e6657bb1483ae99b0ac50275b9a92fefa">酒店</li><li data-list-item-id="e90f5a9e0c8775eae0dd396d234c2ca6e">导游及司机小费</li><li data-list-item-id="e1bc758f69c0ff547e5c8f8aca100c99e">自选行程</li><li data-list-item-id="ed4f1470355a4f65f457a776a07b216c9">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 28: 4-days-paradise-golf-lihaga-island-escape
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '28', 'zh', '天堂高尔夫 & 利哈加岛 4 日', '<ul><li data-list-item-id="e85fcfeb6216e5a3f9b99dd3a6a7c929c">机场接送</li><li data-list-item-id="e8de14905ae06a64f87cc60b7707f22d0">所选酒店 3 晚住宿 – 双床房/大床房（两人一间）</li><li data-list-item-id="eb71e5d213f9c14a6db516ba2d4f3f038">第 2 天果岭费</li><li data-list-item-id="ed12068b91276f3e93b42223230f12673">第 2 天高尔夫球车及球童费用（不含球童小费）</li><li data-list-item-id="ed97e52152f7c86010c43d5fde2101b87">前往利哈加岛的专属快艇</li><li data-list-item-id="ec02237fe232f55cc706fb1297ad87fad">景点门票 &amp; 停车费</li><li data-list-item-id="e54ee6c6a6a0738fa1e15a08e280faef7">第 3 天专业导游</li><li data-list-item-id="e4bb6b6d5246389f96275d7a9a8a82136">行程内所列餐食</li></ul>', '<ul><li data-list-item-id="e3b523e8375ebb8c9d79946b95b626000">往返机票</li><li data-list-item-id="ebb59df0fa48ba937a21926c9d7e1f3dd">导游 &amp; 司机小费</li><li data-list-item-id="e3ce39bff4df98057a82869976df231d7">自选行程</li><li data-list-item-id="e3f219b92323c9770103f518bec22b1ba">套餐外个人消费（额外餐饮等）</li><li data-list-item-id="e11ba73fd8e73eef138f3ca4ad9edebf4">行李搬运服务、机场税 &amp; 超重行李费</li><li data-list-item-id="ec1219e9200318981e942067b191d0e19">个人消费（洗衣、迷你吧、客房服务等）</li><li data-list-item-id="eeb6d510ef8ff5842d69e6e91a30b5aa4">旅游保险</li><li data-list-item-id="e0bf84136b233377c9c534be5adbe9757">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 29: 4-days-paradise-golf-bunaken-escape
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '29', 'zh', '天堂高尔夫 & 布纳肯 4 日', '<ul><li data-list-item-id="e85fcfeb6216e5a3f9b99dd3a6a7c929c">机场接送</li><li data-list-item-id="e8de14905ae06a64f87cc60b7707f22d0">所选酒店 3 晚住宿 – 双床房/大床房（两人一间）</li><li data-list-item-id="eb71e5d213f9c14a6db516ba2d4f3f038">第 2 天果岭费</li><li data-list-item-id="ed12068b91276f3e93b42223230f12673">第 2 天高尔夫球车及球童费用（不含球童小费）</li><li data-list-item-id="ed97e52152f7c86010c43d5fde2101b87">前往布纳肯岛的专属快艇</li><li data-list-item-id="ec02237fe232f55cc706fb1297ad87fad">景点门票 &amp; 停车费</li><li data-list-item-id="e54ee6c6a6a0738fa1e15a08e280faef7">第 3 天专业导游</li><li data-list-item-id="e4bb6b6d5246389f96275d7a9a8a82136">行程内所列餐食</li></ul>', '<ul><li data-list-item-id="e3b523e8375ebb8c9d79946b95b626000">往返机票</li><li data-list-item-id="ebb59df0fa48ba937a21926c9d7e1f3dd">导游 &amp; 司机小费</li><li data-list-item-id="e3ce39bff4df98057a82869976df231d7">自选行程</li><li data-list-item-id="e3f219b92323c9770103f518bec22b1ba">套餐外个人消费（额外餐饮等）</li><li data-list-item-id="e11ba73fd8e73eef138f3ca4ad9edebf4">行李搬运服务、机场税 &amp; 超重行李费</li><li data-list-item-id="ec1219e9200318981e942067b191d0e19">个人消费（洗衣、迷你吧、客房服务等）</li><li data-list-item-id="eeb6d510ef8ff5842d69e6e91a30b5aa4">旅游保险</li><li data-list-item-id="e0bf84136b233377c9c534be5adbe9757">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 30: 4-days-paradise-golf-weekend-escape
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '30', 'zh', '天堂高尔夫周末假期 4 日', '<ul><li data-list-item-id="e85fcfeb6216e5a3f9b99dd3a6a7c929c">机场接送</li><li data-list-item-id="e8de14905ae06a64f87cc60b7707f22d0">所选酒店 3 晚住宿 – 双床房/大床房（两人一间）</li><li data-list-item-id="eb71e5d213f9c14a6db516ba2d4f3f038">第 2 天 &amp; 第 3 天果岭费</li><li data-list-item-id="ed12068b91276f3e93b42223230f12673">高尔夫球车及球童费用（不含球童小费）&nbsp;</li><li data-list-item-id="e4bb6b6d5246389f96275d7a9a8a82136">行程内所列餐食</li></ul>', '<ul><li data-list-item-id="e3b523e8375ebb8c9d79946b95b626000">往返机票</li><li data-list-item-id="ebb59df0fa48ba937a21926c9d7e1f3dd">导游 &amp; 司机小费</li><li data-list-item-id="e3ce39bff4df98057a82869976df231d7">自选行程</li><li data-list-item-id="e3f219b92323c9770103f518bec22b1ba">套餐外个人消费（额外餐饮等）</li><li data-list-item-id="e11ba73fd8e73eef138f3ca4ad9edebf4">行李搬运服务、机场税 &amp; 超重行李费</li><li data-list-item-id="ec1219e9200318981e942067b191d0e19">个人消费（洗衣、迷你吧、客房服务等）</li><li data-list-item-id="eeb6d510ef8ff5842d69e6e91a30b5aa4">旅游保险</li><li data-list-item-id="e0bf84136b233377c9c534be5adbe9757">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 31: 3-days-paradise-golf-weekend-escape
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '31', 'zh', '天堂高尔夫周末假期 3 日', '<ul><li data-list-item-id="e85fcfeb6216e5a3f9b99dd3a6a7c929c">机场接送</li><li data-list-item-id="e8de14905ae06a64f87cc60b7707f22d0">所选酒店 2 晚住宿 – 双床房/大床房（两人一间）</li><li data-list-item-id="eb71e5d213f9c14a6db516ba2d4f3f038">第 2 天 &amp; 第 3 天果岭费</li><li data-list-item-id="ed12068b91276f3e93b42223230f12673">高尔夫球车及球童费用（不含球童小费）&nbsp;</li><li data-list-item-id="e4bb6b6d5246389f96275d7a9a8a82136">行程内所列餐食</li></ul>', '<ul><li data-list-item-id="e3b523e8375ebb8c9d79946b95b626000">往返机票</li><li data-list-item-id="ebb59df0fa48ba937a21926c9d7e1f3dd">导游 &amp; 司机小费</li><li data-list-item-id="e3ce39bff4df98057a82869976df231d7">自选行程</li><li data-list-item-id="e3f219b92323c9770103f518bec22b1ba">套餐外个人消费（额外餐饮等）</li><li data-list-item-id="e11ba73fd8e73eef138f3ca4ad9edebf4">行李搬运服务、机场税 &amp; 超重行李费</li><li data-list-item-id="ec1219e9200318981e942067b191d0e19">个人消费（洗衣、迷你吧、客房服务等）</li><li data-list-item-id="eeb6d510ef8ff5842d69e6e91a30b5aa4">旅游保险</li><li data-list-item-id="e0bf84136b233377c9c534be5adbe9757">行程未提及的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 32: 5-days-bangka-archipelago-diving-escape
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '32', 'zh', '邦卡群岛潜水 5 日', '<ul><li data-list-item-id="eebc7b4e396e8f7cf17ef8a660054c9c3"><p style="text-align:justify;">机场接送&nbsp;</p></li><li data-list-item-id="e07c8a95ee6f8b05f18abc3c068904131"><p style="text-align:justify;">客房（两人一间 – 大床房/双床房）</p></li><li data-list-item-id="ea72b4950372c034d71b5bc788568f7af"><p style="text-align:justify;">全膳餐食</p></li><li data-list-item-id="e9a36fb5e11ed7803755e801175a21ca7"><p style="text-align:justify;">全膳套餐（按 3 个潜水日、每日 2 次上午潜水计算）</p></li></ul>', '<ul><li data-list-item-id="ec756b43cc417da86cc09e4d40b5fccf2">装备租赁</li><li data-list-item-id="e18ed9b2769f68528af4b1df7bdda657a">高氧充气</li><li data-list-item-id="e652fe22505f77dc5bb8cba9be6dee4a2">夜潜 &amp; 五彩青蛙鱼潜水</li><li data-list-item-id="ec89e22491c828ef51748a289e4e276f7">自选行程 &amp; 活动</li><li data-list-item-id="ecb84cba1c33800eb790ef4ec86aa3847">个人消费</li><li data-list-item-id="e8eb11ebbeab17718fad53293458bf0da">机场税 &amp; 超重行李</li><li data-list-item-id="e973813f562b295b4abff7069d5a3fe14">旅游保险</li><li data-list-item-id="e415d746c3ce9f9f2b62c339ce9d53907">上述未提及的任何服务</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 33: 5-days-diving-the-wonders-of-lembeh-strait
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '33', 'zh', '蓝碧海峡潜水奇观 5 日', '<ul><li data-list-item-id="eebc7b4e396e8f7cf17ef8a660054c9c3"><p style="text-align:justify;">机场接送&nbsp;</p></li><li data-list-item-id="e07c8a95ee6f8b05f18abc3c068904131"><p style="text-align:justify;">客房（两人一间 – 大床房/双床房）</p></li><li data-list-item-id="ea72b4950372c034d71b5bc788568f7af"><p style="text-align:justify;">全膳餐食</p></li><li data-list-item-id="e9a36fb5e11ed7803755e801175a21ca7"><p style="text-align:justify;">全膳套餐（按 3 个潜水日、每日 2 次上午潜水计算）</p></li></ul>', '<ul><li data-list-item-id="ec756b43cc417da86cc09e4d40b5fccf2">装备租赁</li><li data-list-item-id="e18ed9b2769f68528af4b1df7bdda657a">高氧充气</li><li data-list-item-id="e652fe22505f77dc5bb8cba9be6dee4a2">夜潜 &amp; 五彩青蛙鱼潜水</li><li data-list-item-id="ec89e22491c828ef51748a289e4e276f7">自选行程 &amp; 活动</li><li data-list-item-id="ecb84cba1c33800eb790ef4ec86aa3847">个人消费</li><li data-list-item-id="e8eb11ebbeab17718fad53293458bf0da">机场税 &amp; 超重行李</li><li data-list-item-id="e973813f562b295b4abff7069d5a3fe14">旅游保险</li><li data-list-item-id="e415d746c3ce9f9f2b62c339ce9d53907">上述未提及的任何服务</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 34: 5-days-bunaken-tangkoko-nature-escape
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '34', 'zh', '布纳肯 & 唐科科自然之旅 5 日', '<ul><li data-list-item-id="eebc7b4e396e8f7cf17ef8a660054c9c3"><p style="text-align:justify;">机场接送&nbsp;</p></li><li data-list-item-id="e07c8a95ee6f8b05f18abc3c068904131"><p style="text-align:justify;">客房（两人一间 – 大床房/双床房）</p></li><li data-list-item-id="ea72b4950372c034d71b5bc788568f7af"><p style="text-align:justify;">全膳餐食</p></li><li data-list-item-id="e9a36fb5e11ed7803755e801175a21ca7"><p style="text-align:justify;">全膳套餐（按 3 个潜水日、每日 2 次上午潜水计算）</p><p><i><strong>唐科科之旅</strong></i>：&nbsp;</p></li><li data-list-item-id="ee940554db6d2888b5bb336fc3adcacdd">唐科科自然保护区护林员</li><li data-list-item-id="ee45511db7425bb0a055e829f59fba41b">前往唐科科 &amp; 图南瀑布的交通</li><li data-list-item-id="e30412c6835047afc69dff857179d3527">当地餐厅午餐 1 次</li><li data-list-item-id="ea8818d92b289888451c817f79249fabe">经验丰富的导游 &amp; 司机</li><li data-list-item-id="ec3ec6d7bb147e07c82d795805c6ecbc9">全部门票&nbsp;</li><li data-list-item-id="e5a9edd557416c1a3372568c67fdfc9a5">每人 1 瓶矿泉水。</li></ul>', '<ul><li data-list-item-id="ec756b43cc417da86cc09e4d40b5fccf2">潜水装备租赁</li><li data-list-item-id="e18ed9b2769f68528af4b1df7bdda657a">高氧充气</li><li data-list-item-id="e652fe22505f77dc5bb8cba9be6dee4a2">夜潜 &amp; 五彩青蛙鱼潜水</li><li data-list-item-id="ec89e22491c828ef51748a289e4e276f7">自选行程 &amp; 活动</li><li data-list-item-id="ecb84cba1c33800eb790ef4ec86aa3847">个人消费</li><li data-list-item-id="e8eb11ebbeab17718fad53293458bf0da">机场税 &amp; 超重行李</li><li data-list-item-id="e973813f562b295b4abff7069d5a3fe14">旅游保险</li><li data-list-item-id="e415d746c3ce9f9f2b62c339ce9d53907">上述未提及的任何服务</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 35: 4-days-discover-bangkas-underwater-paradise
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '35', 'zh', '探索邦卡海底天堂 4 日', '<ul><li data-list-item-id="eebc7b4e396e8f7cf17ef8a660054c9c3"><p style="text-align:justify;">机场接送&nbsp;</p></li><li data-list-item-id="e07c8a95ee6f8b05f18abc3c068904131"><p style="text-align:justify;">客房（两人一间 – 大床房/双床房）</p></li><li data-list-item-id="ea72b4950372c034d71b5bc788568f7af"><p style="text-align:justify;">全膳餐食</p></li><li data-list-item-id="e9a36fb5e11ed7803755e801175a21ca7"><p style="text-align:justify;">全膳套餐（按 2 个潜水日、每日 2 次上午潜水计算）</p></li></ul>', '<ul><li data-list-item-id="ec756b43cc417da86cc09e4d40b5fccf2">装备租赁</li><li data-list-item-id="e18ed9b2769f68528af4b1df7bdda657a">高氧充气</li><li data-list-item-id="e652fe22505f77dc5bb8cba9be6dee4a2">夜潜 &amp; 五彩青蛙鱼潜水</li><li data-list-item-id="ec89e22491c828ef51748a289e4e276f7">自选行程 &amp; 活动</li><li data-list-item-id="ecb84cba1c33800eb790ef4ec86aa3847">个人消费</li><li data-list-item-id="e8eb11ebbeab17718fad53293458bf0da">机场税 &amp; 超重行李</li><li data-list-item-id="e973813f562b295b4abff7069d5a3fe14">旅游保险</li><li data-list-item-id="e415d746c3ce9f9f2b62c339ce9d53907">上述未提及的任何服务</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 36: 4-days-lembeh-macro-diving-escape
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '36', 'zh', '蓝碧微距潜水 4 日', '<ul><li data-list-item-id="eebc7b4e396e8f7cf17ef8a660054c9c3"><p style="text-align:justify;">机场接送&nbsp;</p></li><li data-list-item-id="e07c8a95ee6f8b05f18abc3c068904131"><p style="text-align:justify;">客房（两人一间 – 大床房/双床房）</p></li><li data-list-item-id="ea72b4950372c034d71b5bc788568f7af"><p style="text-align:justify;">全膳餐食</p></li><li data-list-item-id="e9a36fb5e11ed7803755e801175a21ca7"><p style="text-align:justify;">全膳套餐（按 2 个潜水日、每日 2 次上午潜水计算）</p></li></ul>', '<ul><li data-list-item-id="ec756b43cc417da86cc09e4d40b5fccf2">装备租赁</li><li data-list-item-id="e18ed9b2769f68528af4b1df7bdda657a">高氧充气</li><li data-list-item-id="e652fe22505f77dc5bb8cba9be6dee4a2">夜潜 &amp; 五彩青蛙鱼潜水</li><li data-list-item-id="ec89e22491c828ef51748a289e4e276f7">自选行程 &amp; 活动</li><li data-list-item-id="ecb84cba1c33800eb790ef4ec86aa3847">个人消费</li><li data-list-item-id="e8eb11ebbeab17718fad53293458bf0da">机场税 &amp; 超重行李</li><li data-list-item-id="e973813f562b295b4abff7069d5a3fe14">旅游保险</li><li data-list-item-id="e415d746c3ce9f9f2b62c339ce9d53907">上述未提及的任何服务</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 37: 4-days-bunaken-marine-park-experience
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '37', 'zh', '布纳肯海洋公园体验 4 日', '<ul><li data-list-item-id="eebc7b4e396e8f7cf17ef8a660054c9c3"><p style="text-align:justify;">机场接送&nbsp;</p></li><li data-list-item-id="e07c8a95ee6f8b05f18abc3c068904131"><p style="text-align:justify;">客房（两人一间 – 大床房/双床房）</p></li><li data-list-item-id="ea72b4950372c034d71b5bc788568f7af"><p style="text-align:justify;">全膳餐食</p></li><li data-list-item-id="e9a36fb5e11ed7803755e801175a21ca7"><p style="text-align:justify;">全膳套餐（按 2 个潜水日、每日 2 次上午潜水计算）</p></li></ul>', '<ul><li data-list-item-id="ec756b43cc417da86cc09e4d40b5fccf2">装备租赁</li><li data-list-item-id="e18ed9b2769f68528af4b1df7bdda657a">高氧充气</li><li data-list-item-id="e652fe22505f77dc5bb8cba9be6dee4a2">夜潜 &amp; 五彩青蛙鱼潜水</li><li data-list-item-id="ec89e22491c828ef51748a289e4e276f7">自选行程 &amp; 活动</li><li data-list-item-id="ecb84cba1c33800eb790ef4ec86aa3847">个人消费</li><li data-list-item-id="e8eb11ebbeab17718fad53293458bf0da">机场税 &amp; 超重行李</li><li data-list-item-id="e973813f562b295b4abff7069d5a3fe14">旅游保险</li><li data-list-item-id="e415d746c3ce9f9f2b62c339ce9d53907">上述未提及的任何服务</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 38: lihaga-island-white-sand-escape
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '38', 'zh', '利哈加岛白沙假期', '<ul><li data-list-item-id="ea23d3c92112e60644e5e2271e3753532"><p style="text-align:justify;">陆路交通</p></li><li data-list-item-id="e0ea594d6a88f73886434e73627cfc1ef"><p style="text-align:justify;">前往利哈加岛的专属快艇</p></li><li data-list-item-id="eade732e4827ee2d27bca1f6a14016d45"><p style="text-align:justify;">经验丰富的导游</p></li><li data-list-item-id="e688d27ccc1439077a5068c64e476b6ad"><p style="text-align:justify;">司机 &amp; 船员</p></li><li data-list-item-id="ef25650808aa3c32de3a1e39199920a06"><p style="text-align:justify;">景点门票 &amp; 停车费</p></li><li data-list-item-id="e7ac148cecef0bb392af14db4b9f574d4"><p style="text-align:justify;">午餐 &amp; 每人 1 瓶矿泉水</p></li><li data-list-item-id="eccc9556eef6a2fa87c897c5c43a32269"><p style="text-align:justify;">按行程表提供的旅游服务</p></li></ul>', '<ul><li data-list-item-id="ed040cc0dd81d42e795600e22a7bf6536">机票</li><li data-list-item-id="eb2e43bfc1813f79cdda31725bf97dbad">机场税</li><li data-list-item-id="eec4c3bc7fb908919a5b66c97cde714e5">行李搬运</li><li data-list-item-id="ef13b7599a238bc82e6bd5620370064d9">酒店</li><li data-list-item-id="e7a50082855dcc93d44a0d8bbcef795bb">导游及司机小费</li><li data-list-item-id="e2a39ca8ecbefd244e7980a1f24d1bb28">自选行程</li><li data-list-item-id="efae7355dae9278ce19d7a043661cdfd1">行程外的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 39: gangga-lihaga-snorkeling-escape
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '39', 'zh', '甘加 & 利哈加浮潜之旅', '<ul><li data-list-item-id="ec841ebd5e4cd2f22a9ab973c51cd4294"><p style="text-align:justify;">陆路交通</p></li><li data-list-item-id="e0fd2b212b9f3647f5b39e969d280b5b9"><p style="text-align:justify;">前往甘加岛 &amp; 利哈加岛的专属快艇</p></li><li data-list-item-id="e1955e0bd0b95f1e58e091f47a0f210fd"><p style="text-align:justify;">浮潜装备</p></li><li data-list-item-id="ef86508779b01af9d5d07a6933e8c8b71"><p style="text-align:justify;">经验丰富的导游、司机 &amp; 船员</p></li><li data-list-item-id="e6053e10c115a87007b280508a6f4332d"><p style="text-align:justify;">景点门票 &amp; 停车费</p></li><li data-list-item-id="e9615cc9e5ef3f391f33ab1e8faff78dd"><p style="text-align:justify;">午餐 &amp; 每人 1 瓶矿泉水</p></li><li data-list-item-id="e8d83387ff5232b493198cf3640575fe4"><p style="text-align:justify;">按行程表提供的旅游服务</p></li></ul>', '<ul><li data-list-item-id="ed040cc0dd81d42e795600e22a7bf6536">机票</li><li data-list-item-id="eb2e43bfc1813f79cdda31725bf97dbad">机场税</li><li data-list-item-id="eec4c3bc7fb908919a5b66c97cde714e5">行李搬运</li><li data-list-item-id="ef13b7599a238bc82e6bd5620370064d9">酒店</li><li data-list-item-id="e7a50082855dcc93d44a0d8bbcef795bb">导游及司机小费</li><li data-list-item-id="e2a39ca8ecbefd244e7980a1f24d1bb28">自选行程</li><li data-list-item-id="efae7355dae9278ce19d7a043661cdfd1">行程外的其他费用</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 40: manado-tua-island-trekking-bunaken-escape
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '40', 'zh', '美娜多图阿岛徒步 & 布纳肯之旅', '<ul><li data-list-item-id="e00fb6c1118e49e21a7f97503eaf992e5"><p style="text-align:justify;">专属陆路交通（轿车）&nbsp;</p></li><li data-list-item-id="e6716471c34f5fc9b3179bcb936fa58c3"><p style="text-align:justify;">前往美娜多图阿岛 - 布纳肯岛的船只</p></li><li data-list-item-id="e7dbd5d5b9349e351d2566cfe3d45e1f5"><p style="text-align:justify;">经验丰富的导游&nbsp;</p></li><li data-list-item-id="ee7e0b2f9144abb63771706ac469d1409"><p style="text-align:justify;">司机 &amp; 船员&nbsp;</p></li><li data-list-item-id="e5f742e4e693df53a07f0d451ed536d14"><p style="text-align:justify;">景点门票</p></li><li data-list-item-id="e16a242b2af99118485dc893e4c9eb32e"><p style="text-align:justify;">停车费、午餐盒&nbsp;</p></li><li data-list-item-id="e4ee5b7dc98d3b764f8675efcd7904bc8"><p style="text-align:justify;">每人 1 瓶矿泉水&nbsp;</p></li><li data-list-item-id="e19afe33283d9f5a1420ae129e922a3cd"><p style="text-align:justify;">按行程表提供的旅游服务</p></li></ul>', '<ul><li data-list-item-id="e369b588efdeecf96f0f185253b99bd9d">机票&nbsp;</li><li data-list-item-id="ee1063332712c6f3757ec551ca5a90c42">机场税</li><li data-list-item-id="e76eb00c159fe609d319cbf81974ed8fd">行李搬运服务</li><li data-list-item-id="e1cc4535135e2d767b6fafc8aa29d78af">酒店住宿&nbsp;</li><li data-list-item-id="eaf01991d1adab37bf2ca6f7fd2e7f0bf">导游 &amp; 司机小费</li><li data-list-item-id="e1cadc73e8b1505883ffb1bf721a2db91">自选行程 &amp; 行程未提及的其他个人消费</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 41: waruga-heritage-batu-angus-coastal-escape
INSERT INTO `tour_translations` (`translatable_type`, `translatable_id`, `locale`, `title`, `inclusions`, `exclusions`, `created_at`, `updated_at`)
VALUES ('App\\Models\\ManadoTour', '41', 'zh', '瓦鲁加遗迹 & 巴图安古斯海岸之旅', '<ul><li data-list-item-id="ee44c315611f4315dc32a35e8ba7a8932"><p style="text-align:justify;">交通&nbsp;</p></li><li data-list-item-id="e9aebf7e500b9218ae96e4a9735b5887c"><p style="text-align:justify;">船只 &amp; 浮潜装备</p></li><li data-list-item-id="ea78c4cba10fab0194db11ca30051e78c"><p style="text-align:justify;">经验丰富的导游、司机 &amp; 船员</p></li><li data-list-item-id="e763a6a58cf17409d04eff769ee730b2b"><p style="text-align:justify;">景点门票 &amp; 停车费</p></li><li data-list-item-id="ea46383f45241738ea5e48e7cbee46faa"><p style="text-align:justify;">午餐 &amp; 每人 1 瓶矿泉水</p></li><li data-list-item-id="e867486aa2ffffd707bde11fb9e6db2af"><p style="text-align:justify;">按行程表提供的旅游服务</p></li></ul>', '<ul><li data-list-item-id="e369b588efdeecf96f0f185253b99bd9d">机票&nbsp;</li><li data-list-item-id="ee1063332712c6f3757ec551ca5a90c42">机场税</li><li data-list-item-id="e76eb00c159fe609d319cbf81974ed8fd">行李搬运服务</li><li data-list-item-id="e1cc4535135e2d767b6fafc8aa29d78af">酒店住宿&nbsp;</li><li data-list-item-id="eaf01991d1adab37bf2ca6f7fd2e7f0bf">导游 &amp; 司机小费</li><li data-list-item-id="e1cadc73e8b1505883ffb1bf721a2db91">自选行程 &amp; 行程未提及的其他个人消费</li></ul>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `inclusions` = VALUES(`inclusions`), `exclusions` = VALUES(`exclusions`), `updated_at` = NOW();

-- paket 21 hari 1 (itinerary 2749)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('2749', 'zh', '行程安排', '<p style="text-align:justify;">上午 8 点在<strong>美加玛斯码头</strong>与导游集合，展开<strong>布纳肯岛</strong>一日游。从美加玛斯码头乘船约 30 分钟抵达<strong>布纳肯岛</strong>。如今布纳肯已焕然一新，建成更具规模的<strong>布纳肯旅游码头（新布纳肯）</strong>，可在此拍摄以海岛美景为背景的照片与视频。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">通过<i>自选 </i>浮潜或潜水，探索布纳肯海洋公园的水下之美——那里有绚丽的珊瑚礁与色彩缤纷的热带鱼。您也可利用自由时间放松身心，感受岛上宁静的海滩氛围。午餐安排在海滨的当地餐厅。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">餐后可继续享受自由时间，或接着浮潜/潜水（自选）。下午返回美娜多美加玛斯码头。行程结束。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 19 hari 1 (itinerary 2751)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('2751', 'zh', '行程安排', '<p style="text-align:justify;">上午在集合地点接您，前往松德尔<strong>廷布卡尔村</strong>的<strong>漂流地点</strong>。开始漂流前将进行简短培训，包括基本动作与在充气艇上保持平衡的安全须知。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">漂流全程由两名经验丰富的漂流向导陪同，并配备符合国际标准的安全装备。在尼曼加河激流中穿行的约 90 分钟里，您还可欣赏沿途壮丽的自然景色。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">之后返回美娜多市区，于集合地点送回。行程结束。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 17 hari 1 (itinerary 2753)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('2753', 'zh', '行程安排', '<p style="text-align:justify;"><strong>洛孔火山</strong>是托莫洪最高大的山峰之一，为海拔 1,580 米的活火山。正如其名，&ldquo;Lokon&rdquo; 意为最古老、最伟大。其活跃的火山口<strong>通帕卢安火山口</strong>位于山体下部。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">从接送地点驱车前往托莫洪或洛孔火山山麓（约 1 小时 30 分钟），再徒步约 2 小时抵达火山口边缘。目前徒步路线仅至火山口，火山口大致位于通往山顶路程的一半处。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">洛孔火山既有壮丽的自然景致，也为徒步者带来令人振奋的挑战。沿途可饱览秀美风光，包括托莫洪市区的迷人全景。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">徒步结束后前往当地餐厅享用午餐。餐后返回美娜多市区，于指定地点送回。行程结束。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 15 hari 1 (itinerary 2755)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('2755', 'zh', '行程安排', '<p style="text-align:justify;">上午接您前往拉普拉普海滩。抵达后，在这片迷人的海滩展开一段独特体验：先乘独木舟穿行于葱郁红树林间的平静水道，不消几分钟便可展开寻找<strong>眼镜猴</strong>的探险——这种小巧迷人的灵长类动物常出没于红树林之间。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">宁静的自然与林间声响一路相伴，在北苏拉威西的秀丽风光中留下难忘的片刻。发现<strong>眼镜猴</strong>时，您可自由拍照记录这一瞬间。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">随后返回拉普拉普海岸，再前往通帕山高地，在山麓欣赏美丽的<strong>日落</strong>，并品尝<strong>各式美娜多传统小吃</strong>，如香蕉煎饼配罗阿辣酱、红糖炸番薯、红豆冰等 <i>（自选，费用自理）</i>。之后送回集合地点，行程结束。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 14 hari 1 (itinerary 2756)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('2756', 'zh', '行程安排', '<p style="text-align:justify;">上午 10 点在通帕山集合。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">在<strong>通帕山 </strong>体验滑翔伞，对热爱冒险与自然的旅客而言都是一段难忘的经历。在约 1,000 米的高空飞行，您将感受如飞鸟般自由翱翔的畅快，同时俯瞰壮丽的山岳景致、葱郁的森林与澄澈湛蓝的大海。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">通帕山的滑翔伞场地气候稳定、风势和缓，无论是初次尝试还是希望精进技术的旅客，都能在此安全而尽兴地飞行。全程由专业滑翔伞教练陪同，并配备完善的安全装备。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">通帕山滑翔伞既刺激又优美，会让您的美娜多之行真正难以忘怀。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 27 hari 1 (itinerary 4915)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('4915', 'zh', '行程安排', '<p style="text-align:justify;">在美娜多酒店享用早餐后，出发前往<strong>索普坦火山</strong>——北苏拉威西最活跃的火山之一，以壮观的火山景观与令人屏息的自然风光闻名。</p><p style="text-align:justify;">🕐 <strong>从美娜多到索普坦火山山麓的车程：</strong>视路况与天气约需 <strong>2.5–3 小时</strong>。</p><p style="text-align:justify;">沿途可欣赏秀丽的乡野风光、椰林种植园与北苏拉威西的秀美山景，行车本身便是体验的一部分。</p><p style="text-align:justify;">抵达徒步起点后，准备展开<strong>索普坦火山</strong>的精彩攀登。这条路线兼具葱郁的林间小径、开阔的草原、火山岩地貌，以及过往火山活动塑造的壮丽景观。</p><p style="text-align:justify;">🕐 <strong>预计徒步时长（往返）：</strong>视天气、体能与步行节奏约需 <strong>4–5 小时</strong>。</p><p style="text-align:justify;">📸 沿途尽览壮阔全景与雄奇的火山地貌——对自然爱好者、摄影者与冒险者而言，都是一段值得的经历。</p><p style="text-align:justify;">徒步结束后返回车辆，送回美娜多酒店好好休息。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 26 hari 1 (itinerary 5010)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5010', 'zh', '行程安排', '<p style="text-align:justify;">上午 8 点在<strong>美加玛斯码头</strong>与导游集合，展开<strong>跳岛 </strong>一日游。从美加玛斯码头乘船约 30 分钟抵达<strong>布纳肯岛</strong>。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">抵达后前往<strong>布纳肯海洋公园</strong>，这里以环绕<strong>布纳肯岛</strong>的绚丽珊瑚礁与数千种色彩斑斓的鱼类闻名。如今<strong>布纳肯岛</strong>建成了更具吸引力的完善设施，包括<strong>布纳肯旅游码头</strong>，可与家人朋友在此合影留念。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">随后可自选浮潜或潜水，也可在水中亲手喂鱼、畅快游泳。午餐安排在<strong>布纳肯岛</strong>的当地餐厅。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">餐后前往<strong>西拉登岛</strong>与<strong>纳因沙洲</strong>。在每座岛屿上，您都可拍照录影、漫步游览，尽情欣赏<strong>西拉登岛</strong>与<strong>纳因沙洲</strong>的自然之美。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">下午返回美娜多美加玛斯码头。行程结束。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 22 hari 1 (itinerary 5018)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5018', 'zh', '行程安排', '<p style="text-align:justify;">导游在接送地点迎接团员，随即展开市区之旅：前往美娜多市中心、唐人街，以及<strong>万兴宫</strong>（建于 18 世纪、约有 300 年历史的美娜多最古老庙宇）。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">途中还会经过<strong>森特鲁姆教堂</strong>（北苏拉威西第一座新教教堂，荷兰殖民时期遗存）与第二次世界大战纪念碑（纪念 1942 年美娜多遭日军摧毁）。午餐安排在<strong>以金枪鱼料理见长的当地餐厅</strong>，以美娜多传统做法烹制。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">随后前往环路芝达兰地区，近距离欣赏<strong>耶稣赐福像</strong>——这座耶稣像以凌空之姿面向美娜多市区。接着前往<strong>马卡特特山</strong>，这座海拔 200 米的山丘可远眺美娜多市区、美娜多岛、布纳肯岛、西拉登岛、辽阔海面，以及北苏拉威西最高峰克拉巴特山。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">晚餐为自选。餐后送回接送地点，行程结束。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 20 hari 1 (itinerary 5019)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5019', 'zh', '行程安排', '<p style="text-align:justify;">上午由导游接团前往<strong>米纳哈萨高原</strong>，途经<strong>蒂诺尔</strong>地区，可在海拔 500 米处俯瞰美娜多市区。抵达托莫洪后，参观<strong>彩虹旅游公园</strong>，欣赏各色缤纷花卉之美。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">下一站是<strong>托莫洪极限市场</strong>，可近距离见到<i><strong>蝙蝠（paniki）、林鼠、蛇等各类野生动物</strong></i>的肉品。在另一处地点，还可观看<strong>现场制作</strong>美娜多传统糕点的过程，如 <strong>cucur、红糖 apang、dodol</strong> 等当地甜食。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">接着前往<strong>图尔马塞林</strong>的<strong>糖棕林</strong>，那里有多处适合拍照打卡的景致。除了拍照，您还可观看以糖棕树汁发酵蒸馏制成的<i><strong>当地传统酒 </strong></i><strong>&ldquo;Cap Tikus&rdquo;</strong> 的酿造过程。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">午餐安排在<strong>通达诺湖</strong>畔的当地餐厅。餐后前往<strong>布吉卡西</strong>，这处独特的自然景点有活跃的硫磺火山口和通往山顶的阶梯，既能远眺秀丽景色，也能感受别具一格的文化体验。此地还有天然硫磺温泉，可游泳或泡脚放松（自选）。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">行程继续前往<strong>利诺湖</strong>，这座硫磺湖以湖水色彩变幻不定与静谧秀美著称，并奉上咖啡或茶。之后返回美娜多市区。晚餐为自选。餐后送回指定地点，行程结束。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 30 hari 1 (itinerary 5156)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5156', 'zh', '抵达美娜多 - 天堂高尔夫度假村', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉国际机场后，我们的团队将迎接您，并直接送往天堂酒店 &amp; 高尔夫度假村。沿途感受北苏拉威西海岸宁静清新的氛围。</p><p style="text-align:justify;">抵达度假村后办理入住，其余时间可享用酒店设施、欣赏高尔夫球场景致，或在舒适的热带环境中放松身心。第一天特意安排为休整时光，为次日清晨开始的高尔夫体验做准备。</p><p style="text-align:justify;">当晚入住天堂酒店 &amp; 高尔夫度假村。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 30 hari 2 (itinerary 5157)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5157', 'zh', '天堂高尔夫体验（18 洞）', '<p style="text-align:justify;">在酒店享用早餐后，在天堂高尔夫球场挥杆一轮，这里兼具挑战性球道与令人惊艳的自然景致。</p><p style="text-align:justify;">18 洞球局已包含果岭费、球车与球童服务，让您能全心投入球局，尽享舒适体验。球局结束后，可在度假村自由放松，或参与酒店周边提供的自选活动。</p><p style="text-align:justify;">当晚入住天堂酒店 &amp; 高尔夫度假村。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 30 hari 3 (itinerary 5158)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5158', 'zh', '天堂高尔夫体验（18 洞）', '<p style="text-align:justify;">在酒店享用早餐后，展开第二场高尔夫体验。今天您将再次挥杆，细细品味每个球洞各具特色的魅力，同时感受北苏拉威西宁静的热带环境与清新空气。</p><p style="text-align:justify;">球局结束后，可享受自由时间休息、使用度假村设施，或参与度假村内提供的浮潜、玻璃底船等自选活动。</p><p style="text-align:justify;">当晚入住天堂酒店 &amp; 高尔夫度假村。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 30 hari 4 (itinerary 5159)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5159', 'zh', '美娜多出发', '<p style="text-align:justify;">早餐与酒店退房后，出发前您将拥有自由时间。</p><p style="text-align:justify;">在约定时间，我们的团队将送您前往美娜多萨姆拉图兰吉国际机场，搭乘后续航班。在此旅程结束之际，愿在天堂高尔夫度假村的球局，成为您北苏拉威西时光中一段美好的回忆。</p><p style="text-align:justify;"><strong>行程结束</strong></p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 29 hari 1 (itinerary 5160)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5160', 'zh', '抵达美娜多 - 天堂高尔夫度假村', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉国际机场后，我们的团队将迎接您，并送往位于北苏拉威西海岸的天堂酒店 &amp; 高尔夫度假村。车程约 60–90 分钟，沿途可欣赏秀美的乡野与海岸风光。</p><p style="text-align:justify;">抵达度假村后办理入住，其余时间可在宁静的环境中放松、享用酒店设施，或欣赏面向大海的高尔夫球场景致。第一天特意安排为休整时光，为次日清晨开始的主要活动做准备。</p><p style="text-align:justify;">当晚入住天堂酒店 &amp; 高尔夫度假村。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 29 hari 2 (itinerary 5161)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5161', 'zh', '天堂高尔夫体验（18 洞）', '<p style="text-align:justify;">早餐后，在北苏拉威西最佳高尔夫球场之一享受一轮球局。球场兼具挑战性球道、清新的海风与令人愉悦的热带全景。</p><p style="text-align:justify;">18 洞球局已包含果岭费、球车与球童服务，让您尽享舒适的挥杆体验。之后可自由休息、使用度假村设施，或在宁静的热带环境中放松身心。</p><p style="text-align:justify;">当晚入住天堂酒店 &amp; 高尔夫度假村。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 29 hari 3 (itinerary 5162)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5162', 'zh', '布纳肯岛观光体验', '<p style="text-align:justify;">早餐后从度假村办理退房，前往美娜多市区与美加玛斯码头。从这里乘船约 45 分钟渡海前往布纳肯岛。</p><p style="text-align:justify;">抵达布纳肯后，可探索重新打造的新布纳肯区域，多处迷人景点正对苏拉威西碧海。岛上拥有秀美的海滩景致、宁静的热带氛围，以及众多适合摄影与单纯欣赏自然之美的地点。</p><p style="text-align:justify;">若想进一步探索，可自选浮潜或潜水，体验举世闻名的布纳肯海洋公园。午餐供应现烤鱼配美娜多招牌 dabu-dabu 辣酱。</p><p style="text-align:justify;">下午返回美娜多，前往市中心的选定酒店办理入住并休息。</p><p style="text-align:justify;">当晚入住美娜多市区选定酒店。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 29 hari 4 (itinerary 5163)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5163', 'zh', '美娜多出发', '<p style="text-align:justify;">在酒店享用早餐后，出发前您将拥有自由时间。在约定时间，我们的团队将接您并送往美娜多萨姆拉图兰吉国际机场，搭乘后续航班。</p><p style="text-align:justify;">在此旅程结束之际，愿滨海高尔夫与布纳肯岛的美景，成为您北苏拉威西假期中一段美好的回忆。</p><p style="text-align:justify;"><strong>行程结束</strong></p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 32 hari 1 (itinerary 5221)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5221', 'zh', '美娜多抵达 – 转乘前往邦卡岛', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉国际机场后，我们的团队将迎接您，随即出发前往码头，转乘船只渡海前往邦卡岛。陆路加海路的转乘约需 2 小时，沿途可欣赏苏拉威西北部秀美的海岸线，饱览大海与迷人热带岛屿的景致。</p><p style="text-align:justify;">抵达<strong>潜水度假村</strong>后办理入住，可自由放松、漫步园区，或感受宁静的海滩氛围。晚餐在度假村供应，之后请好好休息，为次日清晨开始的水下探险做准备。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 32 hari 2 (itinerary 5222)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5222', 'zh', '邦卡潜水体验', '<p style="text-align:justify;">早餐后，前往邦卡群岛周边精选的潜点尽情潜水，这一带以色彩缤纷的软珊瑚、健康的硬珊瑚及非凡的海洋生物多样性著称。</p><p style="text-align:justify;">邦卡海域别具一格，融合了布纳肯著称的墙潜与蓝碧海峡的泥潜特色。潜水过程中，您可遇见种类繁多的热带鱼、微距海洋生物，以及壮观的水下地貌。</p><p style="text-align:justify;">当日潜水结束后返回度假村，在宁静的岛上氛围中享受自由时间放松身心。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 32 hari 3 (itinerary 5223)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5223', 'zh', '邦卡潜水体验', '<p style="text-align:justify;">在度假村享用早餐后，继续探索邦卡的水下世界。今天将前往另一处潜点，那里景致多样——从色彩斑斓的珊瑚礁与水下尖峰，到栖息着各类热带海洋生物的水下岩壁。</p><p style="text-align:justify;">邦卡群岛拥有超过 40 个潜点，每次下潜都为新手与经验丰富的潜水者带来全新体验。</p><p style="text-align:justify;">下午返回度假村，在海滩或度假村设施中享受悠闲时光。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 32 hari 4 (itinerary 5224)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5224', 'zh', '邦卡潜水体验', '<p style="text-align:justify;">早餐后继续潜水探险，深入探索邦卡群岛更多的水下美景。这一带凭借清澈的水质与保存完好的海洋生态系统，被视为北苏拉威西最佳潜水目的地之一。</p><p style="text-align:justify;">抓住最后的机会，欣赏丰富的热带海洋生物、健康的珊瑚礁，以及让邦卡成为印度尼西亚潜水爱好者心中隐世秘境的水下全景。</p><p style="text-align:justify;">潜水结束后返回度假村，享受悠闲的下午，并在岛上享用最后一次晚餐。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 32 hari 5 (itinerary 5225)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5225', 'zh', '邦卡岛 - 出发', '<p style="text-align:justify;">早餐与退房后，返程之旅从乘船转乘至本岛开始，随后前往美娜多萨姆拉图兰吉国际机场，或市区内选定的酒店。</p><p style="text-align:justify;">在此旅程结束之际，愿探索邦卡群岛水下美景的经历，成为一段难忘的回忆，也为您在北苏拉威西最佳潜水目的地之一留下新的故事。</p><p style="text-align:justify;"><strong>行程结束</strong></p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 33 hari 1 (itinerary 5226)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5226', 'zh', '美娜多抵达 - 转乘前往蓝碧岛', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉国际机场后，我们的团队将迎接您，随即直接前往码头，转乘船只渡海前往蓝碧岛。前往度假村约需 1 小时 40 分钟，沿途结合陆路与船运，饱览北苏拉威西秀美的海岸线。</p><p style="text-align:justify;">抵达度假村后办理入住，可自由放松、漫步园区，或感受蓝碧岛的宁静氛围——这里是世界知名的顶级潜水目的地之一。晚餐在度假村供应，之后请好好休息，为次日清晨开始的水下探险做准备。</p><p style="text-align:justify;">&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 33 hari 2 (itinerary 5227)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5227', 'zh', '蓝碧海峡潜水体验', '<p style="text-align:justify;">早餐后，潜水探险从蓝碧海峡精选的潜点展开——这里被誉为世界顶级泥潜地点之一。黑色的火山沙形成独特的栖息环境，孕育着种类繁多的珍稀奇特海洋生物。</p><p style="text-align:justify;">潜水过程中，您可遇见深受水下摄影师青睐的奇特生物，从青蛙鱼、海蛞蝠到许多在他处难得一见的物种。完成上午两次下潜后，返回度假村享用午餐并度过悠闲的下午。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 33 hari 3 (itinerary 5228)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5228', 'zh', '蓝碧微距潜水探险', '<p style="text-align:justify;">在度假村享用早餐后，继续探索蓝碧海峡的水下世界。今天将再次前往精选潜点，这里蕴藏着让蓝碧闻名于国际潜水者与专业摄影师之间的非凡微距海洋生物，且潮流相对平缓，潜水过程舒适。</p><p style="text-align:justify;">每一次下潜都有机会发现不同的物种，正因如此，蓝碧才成为水下摄影师与渴望一窥他处罕见海洋生物之美的潜水者的心之所向。潜水结束后返回度假村，在宁静的岛上氛围中享受自由时间。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 33 hari 4 (itinerary 5229)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5229', 'zh', '蓝碧水下探索', '<p style="text-align:justify;">早餐后进入潜水行程的最后一天，继续探索蓝碧海峡更多的绝佳潜点。除了非凡的微距生物外，部分区域还有沉船与广角摄影的绝佳景致值得一探。</p><p style="text-align:justify;">今天是您尽享举世闻名的蓝碧海洋生物多样性的最后机会。潜水结束后返回度假村，在海滩边度过悠闲的下午，并在岛上享用最后一次晚餐。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 33 hari 5 (itinerary 5230)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5230', 'zh', '蓝碧岛 - 出发', '<p style="text-align:justify;">早餐与退房后，返程之旅从乘船转乘至本岛开始，随后前往美娜多萨姆拉图兰吉国际机场，或美娜多市区内选定的酒店。</p><p style="text-align:justify;">在此旅程结束之际，愿探索蓝碧海峡水下微距世界的经历，为您留下非凡的回忆，成为您在印度尼西亚最精彩的潜水体验之一。</p><p style="text-align:justify;"><strong>行程结束</strong></p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 35 hari 1 (itinerary 5236)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5236', 'zh', '美娜多抵达 - 转乘前往邦卡岛', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉国际机场后，我们的团队将迎接您，随即出发前往码头，转乘船只渡海前往邦卡岛。陆路加海路的转乘约需 2 小时，沿途可欣赏苏拉威西北部秀美的海岸线，饱览大海与热带岛屿的壮阔景致。</p><p style="text-align:justify;">抵达潜水度假村后办理入住，可自由在海滩边放松、欣赏海景，或单纯感受远离喧嚣的热带岛屿的宁静。晚餐在度假村供应。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 35 hari 2 (itinerary 5237)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5237', 'zh', '邦卡潜水体验', '<p style="text-align:justify;">早餐后，水下探险从邦卡群岛周边精选的最佳潜点展开。这一带以布纳肯式墙潜与蓝碧式泥潜的独特结合著称，让您在同一目的地体验截然不同的潜水风格。</p><p style="text-align:justify;">尽情欣赏色彩缤纷的软珊瑚与硬珊瑚、壮观的水下地貌，以及栖息于邦卡海域的众多热带物种。完成上午两次下潜后，返回度假村享用午餐并度过悠闲的下午。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 35 hari 3 (itinerary 5238)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5238', 'zh', '邦卡潜水体验', '<p style="text-align:justify;">在度假村享用早餐后，继续探索邦卡群岛的水下世界。今天将前往另一处潜点，那里有保存格外完好的珊瑚礁、令人惊叹的水下尖峰，以及让邦卡成为北苏拉威西最佳潜水目的地之一的丰富海洋生物。</p><p style="text-align:justify;">潜水结束后返回度假村，在海滩边享受自由时间放松，欣赏邦卡岛上美丽的日落。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 35 hari 4 (itinerary 5239)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5239', 'zh', '邦卡岛 - 出发', '<p style="text-align:justify;">早餐与退房后，返程之旅从乘船转乘至本岛开始，随后走陆路前往美娜多萨姆拉图兰吉国际机场，或美娜多市区内选定的酒店。</p><p style="text-align:justify;">在此行程结束之际，愿探索邦卡群岛水下美景、感受热带岛屿宁静的经历，成为您在北苏拉威西时光中一段难忘的回忆。</p><p style="text-align:justify;"><strong>行程结束</strong></p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 36 hari 1 (itinerary 5252)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5252', 'zh', '美娜多抵达 - 转乘前往蓝碧岛', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉国际机场后，我们的团队将迎接您，随即直接前往码头，继续前往蓝碧岛。前往度假村约需 1 小时 40 分钟，沿途结合陆路与船运，饱览北苏拉威西秀美的海岸线。</p><p style="text-align:justify;">抵达潜水度假村后办理入住，可在这座热带岛屿的宁静氛围中自由放松。下午可自由休息，或欣赏蓝碧海峡的风光——这个名字在全球潜水者之间早已如雷贯耳。晚餐在度假村供应。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 36 hari 2 (itinerary 5253)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5253', 'zh', '蓝碧海峡潜水体验', '<p style="text-align:justify;">早餐后，水下探险从蓝碧海峡精选的顶级潜点展开，进行上午两次下潜。这处目的地被誉为世界顶级的泥潜与微距摄影胜地，黑色的火山沙形成独特的栖息环境，孕育着大量珍稀海洋物种。</p><p style="text-align:justify;">潜水过程中，您可发现青蛙鱼、海蛞蝠、海马等奇特生物，还有其他令全球水下摄影师趋之若鹜的珍稀物种。潜水结束后返回度假村享用午餐并享有自由时间。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 36 hari 3 (itinerary 5254)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5254', 'zh', '蓝碧微距潜水探险', '<p style="text-align:justify;">在度假村享用早餐后，继续探索蓝碧海峡的水下世界。今天将再次前往精选潜点，这里蕴藏着非凡的微距海洋生物，且潮流相对平缓，潜水体验舒适惬意。</p><p style="text-align:justify;">每一次下潜都有机会发现不同的物种，正因如此，蓝碧才成为水下摄影师与渴望一窥他处罕见海洋生物之美的潜水者心中的宠儿。潜水结束后返回度假村，在海滩边度过悠闲的下午。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 36 hari 4 (itinerary 5255)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('5255', 'zh', '蓝碧岛 - 出发', '<p style="text-align:justify;">早餐与退房后，返程之旅从乘船转乘至本岛开始，随后走陆路前往美娜多萨姆拉图兰吉国际机场，或美娜多市区内选定的酒店。</p><p style="text-align:justify;">在此旅程结束之际，愿蓝碧海峡的微距潜水体验，成为您在北苏拉威西最难忘的水下探险之一。</p><p style="text-align:justify;"><strong>行程结束</strong></p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 39 hari 1 (itinerary 6223)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6223', 'zh', '行程安排', '<p style="text-align:justify;">早餐后，我们的团队将到美娜多市区的酒店接您。随后前往塞雷利库邦码头，沿途可欣赏北苏拉威西特有的海岸与乡野风光。抵达码头后，乘专属快艇前往甘加岛周边海域——利库邦地区最佳的浮潜地点之一。这里有原始的珊瑚礁、种类繁多的彩色热带鱼，以及能见度极佳的清澈海水。</p><p style="text-align:justify;">浮潜结束后，前往以细软白沙与碧蓝海水闻名的利哈加岛。您可畅游、在岸边放松、环岛漫步，或在多处以壮丽热带风光为背景的拍照点留下瞬间。午餐在宁静自然的利哈加岛供应。</p><p style="text-align:justify;">下午乘船返回塞雷利库邦码头，再走陆路前往美娜多市区。回酒店前，可在美娜多特产中心选购当地美食、手工艺品与纪念品。之后送您回酒店，带着利库邦两座最美热带岛屿的难忘体验。</p><p style="text-align:justify;"><strong>行程结束</strong></p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 24 hari 1 (itinerary 6888)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6888', 'zh', '抵达 – 图南瀑布 – 唐科科自然保护区', '<p style="text-align:justify;">上午抵达美娜多。与导游会合后，前往 <strong>图南瀑布</strong>，这座瀑布位于 <strong>塔拉万村</strong>。<strong>图南瀑布</strong> 的水源来自山上的河流，水流相当湍急地沿着约 86 米高的陡峭崖壁倾泻而下。至今仍保持原始自然的森林氛围，为 <strong>图南瀑布</strong> 自然旅游景点增添了几分秀美。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">我们随即驱车前往 <strong>唐科科国家公园</strong>（若您于下午抵达，则略过图南瀑布行程，直接前往唐科科的巴图普提村）。傍晚时分，在林中进行一段短途徒步，寻找公园的明星物种：眼镜猴——地球上最小的哺乳动物。当晚入住唐科科民宿。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 24 hari 2 (itinerary 6889)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6889', 'zh', '唐科科全日游', '<p style="text-align:justify;">在民宿享用早餐后，前往唐科科自然保护区探寻北苏拉威西的特有物种。寻找黑冠猕猴（北苏拉威西特有的黑猴）、另一种明星动物眼镜猴（世界上最小的灵长类动物）、袋貂，以及众多鸟类。这座国家公园是全球犀鸟数量最多的地方，其中包括冠斑犀鸟。 午餐后，下午再次深入唐科科丛林探访。当晚入住民宿。&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 24 hari 3 (itinerary 6890)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6890', 'zh', '萨旺安瓦鲁加 – 米纳哈萨高原之旅', '<p style="text-align:justify;">早餐后办理退房，驱车前往高原地区，随后前往 <strong>萨旺安瓦鲁加</strong>，途中在米纳哈萨人的古代墓葬（巨石时代）稍作停留。午餐安排在 <strong>通达诺湖</strong>。接着前往托莫洪参观 <strong>传统市场</strong>，之后造访 <strong>沃洛安村</strong> 的组装式木屋产业（当地居民在此建造精美的米纳哈萨式木屋，可拆解后运出村外），最后在 <strong>托莫洪 Kai&rsquo;santi</strong> 拍照，背景是洛孔火山与青翠稻田。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">下午在 <strong>利诺湖</strong> 品咖啡或茶。之后入住托莫洪的度假酒店。&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 24 hari 4 (itinerary 6891)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6891', 'zh', '马哈乌火山 - 送往机场', '<p style="text-align:justify;">在酒店享用早餐后办理退房。与导游会合，前往 <strong>马哈乌火山口</strong>。徒步 10 分钟抵达火山口边缘，便可饱览托莫洪与美娜多以及远方岛屿的壮丽景色；在火山口底部，可见蒸腾的湖水并闻到池中散出的硫磺气味。随后由导游送往机场搭机离开。&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 25 hari 1 (itinerary 6892)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6892', 'zh', '抵达 – 米纳哈萨高原 – 唐科科自然保护区', '<p style="text-align:justify;">上午抵达美娜多。与导游会合后，前往 <strong>马哈乌火山口</strong>。徒步 10 分钟抵达火山口边缘，便可饱览托莫洪与美娜多以及远方岛屿的壮丽景色。之后参观组装式传统木屋产业中心 <strong>沃洛安村</strong>，并在以洛孔火山为背景的 <strong>宝塔佛寺</strong> 停留拍照。随后在色彩绚丽的 <strong>利诺湖</strong> 畔的雅致餐厅品咖啡或茶，悠享午后时光。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">行程继续前往 <strong>萨旺安瓦鲁加</strong>，途中在米纳哈萨人的古代墓葬（巨石时代）稍作停留。之后驱车前往唐科科。（若您于下午抵达，则略过米纳哈萨高原行程，直接前往唐科科的巴图普提村。）当晚入住唐科科民宿。&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 25 hari 2 (itinerary 6893)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6893', 'zh', '唐科科全日游', '<p style="text-align:justify;">在民宿享用早餐后，前往唐科科自然保护区探寻北苏拉威西的特有物种。寻找黑冠猕猴（北苏拉威西特有的黑猴）、眼镜猴（世界上最小的灵长类动物）、袋貂，以及众多鸟类。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">这座国家公园是全球犀鸟数量最多的地方，其中包括冠斑犀鸟。午餐后，下午再次深入唐科科丛林探访。当晚入住民宿。&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 25 hari 3 (itinerary 6894)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6894', 'zh', '送往机场', '<p style="text-align:justify;">在酒店享用早餐后办理退房。若时间允许，可前往市区选购纪念品。随后由导游送往机场搭机离开。行程结束，谢谢。&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 13 hari 1 (itinerary 6895)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6895', 'zh', '抵达 – 美娜多市区之旅 – 马卡特特山 – SunBae 美娜多', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉机场后，导游将迎接团员并展开美娜多市区之旅。参观市中心、<strong>唐人街</strong>，以及建于 18 世纪、约有 300 年历史的美娜多最古老庙宇<strong>万兴宫</strong>。&nbsp;随后经过荷兰殖民时期建立的北苏拉威西第一座新教教堂<strong>森特鲁姆教堂</strong>，以及纪念 1942 年美娜多遭日军摧毁的<strong>第二次世界大战纪念碑</strong>。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">接着前往<strong>芝达兰</strong>环路地区，参观<strong>耶稣赐福像</strong>——这座耶稣像以独特的前倾姿态凌空而立，面向美娜多市区。&nbsp;之后前往<strong>马卡特特山</strong>，海拔 200 米，可俯瞰美娜多市区、<strong>美娜多图阿岛</strong>、<strong>布纳肯岛</strong>、<strong>西拉登岛</strong>、辽阔海面，以及北苏拉威西最高峰<strong>克拉巴特山</strong>。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">晚餐为自选，安排在当地餐厅。餐后可前往美娜多热门海滨聚会点<strong>SunBae</strong>，在众多摊档中享用各式小吃与饮品，感受夜晚的氛围（自选）。之后送往酒店办理入住并休息。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 13 hari 2 (itinerary 6896)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6896', 'zh', '布纳肯观光之旅 – 当地咖啡加工坊 – 购物之旅', '<p style="text-align:justify;">在酒店享用早餐后，导游接团前往<strong>布纳肯岛</strong>。从酒店出发前往美加玛斯码头，再乘船约 30 分钟横渡至布纳肯。 如今布纳肯岛建成了新的<strong>布纳肯旅游码头（新布纳肯）</strong>，更具魅力，是拍照录像的绝佳地点。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">随后前往探索以缤纷珊瑚礁与丰富热带海洋生物闻名的<strong>布纳肯海洋公园</strong>之美。可自选<i></i><strong> 浮潜或潜水</strong>活动，也可悠闲漫步，感受布纳肯的海滩氛围。&nbsp; 午餐为自选，安排在当地餐厅。餐后可继续享有自由时间，进行浮潜/潜水（自选）。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">返回美加玛斯码头，随后参观<strong>当地咖啡加工坊</strong>，品尝正宗的北苏拉威西咖啡风味。之后前往<strong>纪念品购物区</strong>，选购各式美娜多特产（或先返回酒店，晚餐前再次接送）。 晚餐为自选，安排在当地餐厅，之后送返酒店。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 13 hari 3 (itinerary 6897)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6897', 'zh', '送往机场 – 出发', '<p style="text-align:justify;">在酒店享用早餐并办理退房手续后，导游将接团直接送往机场，搭乘返程航班。行程结束。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 12 hari 1 (itinerary 6898)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6898', 'zh', '抵达 – 美娜多市区之旅 – 马卡特特山 – SunBae 美娜多', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉机场后，导游将迎接团员并展开美娜多市区之旅。参观市中心、<strong>唐人街</strong>，以及建于 18 世纪、约有 300 年历史的美娜多最古老庙宇<strong>万兴宫</strong>。&nbsp;随后经过荷兰殖民时期建立的北苏拉威西第一座新教教堂<strong>森特鲁姆教堂</strong>，以及纪念 1942 年美娜多遭日军摧毁的<strong>第二次世界大战纪念碑</strong>。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">接着前往<strong>芝达兰</strong>环路地区，参观<strong>耶稣赐福像</strong>——这座耶稣像以独特的前倾姿态凌空而立，面向美娜多市区。&nbsp;之后前往<strong>马卡特特山</strong>，海拔 200 米，可俯瞰美娜多市区、<strong>美娜多图阿岛</strong>、<strong>布纳肯岛</strong>、<strong>西拉登岛</strong>、辽阔海面，以及北苏拉威西最高峰<strong>克拉巴特山</strong>。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">晚餐为自选，安排在当地餐厅。餐后可前往美娜多热门海滨聚会点<strong>SunBae</strong>，在众多摊档中享用各式小吃与饮品，感受夜晚的氛围（自选）。之后送往酒店办理入住并休息。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 12 hari 2 (itinerary 6899)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6899', 'zh', '米纳哈萨高原之旅', '<p style="text-align:justify;">在酒店享用早餐后，导游接团前往<strong>米纳哈萨高原</strong>全日游，途经蒂诺尔地区，可在海拔 500 米处俯瞰美娜多市区。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">抵达托莫洪后，参观<strong>彩虹旅游公园</strong>，欣赏各色缤纷花卉之美。接着前往<strong>托莫洪极限市场</strong>，可见到蝙蝠、林鼠、蛇等各类野生动物的肉品。在另一处地点，还可观看<strong>现场制作</strong>美娜多传统糕点的过程，如<i>cucur</i>、<i>红糖 apang</i>、<i>dodol</i> 等当地小吃。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">行程继续前往<strong>图尔马塞林</strong>的糖棕林，那里有多处适合拍照打卡的景致。在这里，还可观看以糖棕树汁发酵蒸馏制成的当地传统酒<strong>&ldquo;Cap Tikus&rdquo;</strong>的酿造过程。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">午餐为自选，安排在当地餐厅。餐后前往<strong>布吉卡西</strong>，这处独特的自然景点有活跃的硫磺火山口和通往山顶的阶梯，既能远眺秀丽景色，也能感受别具一格的文化体验。此地还有天然硫磺温泉，可游泳或泡脚放松（自选）。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">接着参观<strong>利诺湖</strong>，这座硫磺湖以变幻不定的湖水色彩与秀美宁静的风光闻名，并奉上咖啡或茶。之后返回美娜多市区。晚餐为自选，安排在当地餐厅，之后送返酒店。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 12 hari 3 (itinerary 6900)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6900', 'zh', '送往机场 – 出发', '<p style="text-align:justify;">在酒店享用早餐并办理退房手续后，导游将接团直接送往机场，搭乘返程航班。行程结束。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 8 hari 1 (itinerary 6901)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6901', 'zh', '抵达 – 美娜多市区之旅 – 马卡特特山 – SunBae 美娜多', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉机场后，导游将迎接团员并展开美娜多市区之旅。参观市中心、<strong>唐人街</strong>，以及建于 18 世纪、约有 300 年历史的美娜多最古老庙宇<strong>万兴宫</strong>。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">随后经过荷兰殖民时期建立的北苏拉威西第一座新教教堂<strong>森特鲁姆教堂</strong>，以及纪念 1942 年美娜多遭日军摧毁的<strong>第二次世界大战纪念碑</strong>。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">接着前往<strong>芝达兰</strong>环路地区，参观<strong>耶稣赐福像</strong>——这座耶稣像以独特的前倾姿态凌空而立，面向美娜多市区。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">之后前往<strong>马卡特特山</strong>，海拔 200 米，可俯瞰美娜多市区、<strong>美娜多图阿岛</strong>、<strong>布纳肯岛</strong>、<strong>西拉登岛</strong>、辽阔海面，以及北苏拉威西最高峰<strong>克拉巴特山</strong>。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">晚餐为自选，安排在当地餐厅。餐后可前往美娜多热门海滨聚会点<strong>SunBae</strong>，在众多摊档中享用各式小吃与饮品，感受夜晚的氛围（自选）。之后送往酒店办理入住并休息。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 8 hari 2 (itinerary 6902)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6902', 'zh', '布纳肯观光之旅 – 当地咖啡加工坊 – 购物之旅', '<p style="text-align:justify;">在酒店享用早餐后，导游接团前往<strong>布纳肯岛</strong>。从酒店出发前往美加玛斯码头，再乘船约 30 分钟横渡至布纳肯。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">如今布纳肯岛建成了新的<strong>布纳肯旅游码头（新布纳肯）</strong>，更具魅力，是拍照录像的绝佳地点。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">随后前往探索以缤纷珊瑚礁与丰富热带海洋生物闻名的<strong>布纳肯海洋公园</strong>之美。可自选<i></i><strong> 浮潜或潜水</strong>活动，也可悠闲漫步，感受布纳肯的海滩氛围。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">午餐为自选，安排在当地餐厅。餐后可继续享有自由时间，进行浮潜/潜水（自选）。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">返回美加玛斯码头，随后参观<strong>当地咖啡加工坊</strong>，品尝正宗的北苏拉威西咖啡风味。之后前往<strong>纪念品购物区</strong>，选购各式美娜多特产（或先返回酒店，晚餐前再次接送）。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">晚餐为自选，安排在当地餐厅，之后送返酒店。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 8 hari 3 (itinerary 6903)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6903', 'zh', '米纳哈萨高原之旅', '<p style="text-align:justify;">在酒店享用早餐后，导游接团前往<strong>米纳哈萨高原</strong>全日游，途经蒂诺尔地区，可在海拔 500 米处俯瞰美娜多市区。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">抵达托莫洪后，参观<strong>彩虹旅游公园</strong>，欣赏各色缤纷花卉之美。接着前往<strong>托莫洪极限市场</strong>，可见到蝙蝠、林鼠、蛇等各类野生动物的肉品。在另一处地点，还可观看<strong>现场制作</strong>美娜多传统糕点的过程，如<i>cucur</i>、<i>红糖 apang</i>、<i>dodol</i> 等当地小吃。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">行程继续前往<strong>图尔马塞林</strong>的糖棕林，那里有多处适合拍照打卡的景致。在这里，还可观看以糖棕树汁发酵蒸馏制成的当地传统酒<strong>&ldquo;Cap Tikus&rdquo;</strong>的酿造过程。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">午餐为自选，安排在当地餐厅。餐后前往<strong>布吉卡西</strong>，这处独特的自然景点有活跃的硫磺火山口和通往山顶的阶梯，既能远眺秀丽景色，也能感受别具一格的文化体验。此地还有天然硫磺温泉，可游泳或泡脚放松（自选）。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">接着参观<strong>利诺湖</strong>，这座硫磺湖以变幻不定的湖水色彩与秀美宁静的风光闻名，并奉上咖啡或茶。之后返回美娜多市区。晚餐为自选，安排在当地餐厅，之后送返酒店。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 8 hari 4 (itinerary 6904)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6904', 'zh', '送往机场 – 出发', '<p style="text-align:justify;">在酒店享用早餐并办理退房手续后，导游将接团直接送往机场，搭乘返程航班。行程结束。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 9 hari 1 (itinerary 6905)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6905', 'zh', '抵达 – 美娜多市区之旅 – 马卡特特山 – SunBae 美娜多', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉机场后，导游将迎接团员并展开美娜多市区之旅。参观市中心、<strong>唐人街</strong>，以及建于 18 世纪、约有 300 年历史的美娜多最古老庙宇<strong>万兴宫</strong>。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">随后经过荷兰殖民时期建立的北苏拉威西第一座新教教堂<strong>森特鲁姆教堂</strong>，以及纪念 1942 年美娜多遭日军摧毁的<strong>第二次世界大战纪念碑</strong>。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">接着前往<strong>芝达兰</strong>环路地区，参观<strong>耶稣赐福像</strong>——这座耶稣像以独特的前倾姿态凌空而立，面向美娜多市区。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">之后前往<strong>马卡特特山</strong>，海拔 200 米，可俯瞰美娜多市区、<strong>美娜多图阿岛</strong>、<strong>布纳肯岛</strong>、<strong>西拉登岛</strong>、辽阔海面，以及北苏拉威西最高峰<strong>克拉巴特山</strong>。</p><p style="text-align:justify;">&nbsp;</p><p>晚餐为自选，安排在当地餐厅。餐后可前往美娜多热门海滨聚会点<strong>SunBae</strong>，在众多摊档中享用各式小吃与饮品，感受夜晚的氛围（自选）。之后送往酒店办理入住并休息。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 9 hari 2 (itinerary 6906)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6906', 'zh', '布纳肯观光之旅 – 当地咖啡加工坊 – 购物之旅', '<p style="text-align:justify;">在酒店享用早餐后，导游接团前往<strong>布纳肯岛</strong>。从酒店出发前往美加玛斯码头，再乘船约 30 分钟横渡至布纳肯。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">如今布纳肯岛建成了新的<strong>布纳肯旅游码头（新布纳肯）</strong>，更具魅力，是拍照录像的绝佳地点。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">随后前往探索以缤纷珊瑚礁与丰富热带海洋生物闻名的<strong>布纳肯海洋公园</strong>之美。可自选<i></i><strong> 浮潜或潜水</strong>活动，也可悠闲漫步，感受布纳肯的海滩氛围。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">午餐为自选，安排在当地餐厅。餐后可继续享有自由时间，进行浮潜/潜水（自选）。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">返回美加玛斯码头，随后参观<strong>当地咖啡加工坊</strong>，品尝正宗的北苏拉威西咖啡风味。之后前往<strong>纪念品购物区</strong>，选购各式美娜多特产（或先返回酒店，晚餐前再次接送）。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">晚餐为自选，安排在当地餐厅，之后送返酒店。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 9 hari 3 (itinerary 6907)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6907', 'zh', '利哈加岛 – 布多旅游村', '<p style="text-align:justify;">在酒店享用早餐后，导游接团前往利库邦地区，距美娜多市中心约 1 小时 20 分钟车程。第一站是<strong>塞雷港</strong>，抵达后再乘船约 15 分钟前往<strong>利哈加岛</strong>。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">在<strong>利哈加岛</strong>，可尽情享受迷人的白色细沙海滩，环岛游览，并在多处美丽的拍照打卡点留影。也可自选浮潜、独木舟或潜水活动。午餐安排在岛上供应。餐后可利用额外的自由时间在海滩边放松。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">返回美娜多途中，将在<strong>布多旅游村</strong>停留，伴着炸香蕉与新鲜椰子等当地小吃，欣赏美丽的日落。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">晚餐为自选，安排在当地餐厅，之后送返酒店。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 9 hari 4 (itinerary 6908)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6908', 'zh', '送往机场 – 出发', '<p style="text-align:justify;">在酒店享用早餐并办理退房手续后，导游将接团直接送往机场，搭乘返程航班。行程结束。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 11 hari 1 (itinerary 6909)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6909', 'zh', '抵达 – 美娜多市区之旅 – 马卡特特山 – SunBae 美娜多', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉机场后，导游将迎接团员并展开美娜多市区之旅。参观市中心、<strong>唐人街</strong>，以及建于 18 世纪、约有 300 年历史的美娜多最古老庙宇<strong>万兴宫</strong>。&nbsp;随后经过荷兰殖民时期建立的北苏拉威西第一座新教教堂<strong>森特鲁姆教堂</strong>，以及纪念 1942 年美娜多遭日军摧毁的<strong>第二次世界大战纪念碑</strong>。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">接着前往<strong>芝达兰</strong>环路地区，参观<strong>耶稣赐福像</strong>——这座耶稣像以独特的前倾姿态凌空而立，面向美娜多市区。&nbsp;之后前往<strong>马卡特特山</strong>，海拔 200 米，可俯瞰美娜多市区、<strong>美娜多图阿岛</strong>、<strong>布纳肯岛</strong>、<strong>西拉登岛</strong>、辽阔海面，以及北苏拉威西最高峰<strong>克拉巴特山</strong>。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">晚餐为自选，安排在当地餐厅。餐后可前往美娜多热门海滨聚会点<strong>SunBae</strong>，在众多摊档中享用各式小吃与饮品，感受夜晚的氛围（自选）。之后送往酒店办理入住并休息。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 11 hari 2 (itinerary 6910)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6910', 'zh', '米纳哈萨高原之旅', '<p style="text-align:justify;">在酒店享用早餐后，导游接团前往<strong>米纳哈萨高原</strong>全日游，途经蒂诺尔地区，可在海拔 500 米处俯瞰美娜多市区。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">抵达托莫洪后，参观<strong>彩虹旅游公园</strong>，欣赏各色缤纷花卉之美。接着前往<strong>托莫洪极限市场</strong>，可见到蝙蝠、林鼠、蛇等各类野生动物的肉品。在另一处地点，还可观看<strong>现场制作</strong>美娜多传统糕点的过程，如<i>cucur</i>、<i>红糖 apang</i>、<i>dodol</i> 等当地小吃。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">行程继续前往<strong>图尔马塞林</strong>的糖棕林，那里有多处适合拍照打卡的景致。在这里，还可观看以糖棕树汁发酵蒸馏制成的当地传统酒<strong>&ldquo;Cap Tikus&rdquo;</strong>的酿造过程。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">午餐为自选，安排在当地餐厅。餐后前往<strong>布吉卡西</strong>，这处独特的自然景点有活跃的硫磺火山口和通往山顶的阶梯，既能远眺秀丽景色，也能感受别具一格的文化体验。此地还有天然硫磺温泉，可游泳或泡脚放松（自选）。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">接着参观<strong>利诺湖</strong>，这座硫磺湖以变幻不定的湖水色彩与秀美宁静的风光闻名，并奉上咖啡或茶。之后返回美娜多市区。晚餐为自选，安排在当地餐厅，之后送返酒店。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 11 hari 3 (itinerary 6911)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6911', 'zh', '利哈加岛 – 布多旅游村', '<p style="text-align:justify;">在酒店享用早餐后，导游接团前往利库邦地区，距美娜多市中心约 1 小时 20 分钟车程。第一站是<strong>塞雷港</strong>，抵达后再乘船约 15 分钟前往<strong>利哈加岛</strong>。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">在<strong>利哈加岛</strong>，可尽情享受迷人的白色细沙海滩，环岛游览，并在多处美丽的拍照打卡点留影。也可自选浮潜、独木舟或潜水活动。午餐安排在岛上供应。餐后可利用额外的自由时间在海滩边放松。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">返回美娜多途中，将在<strong>布多旅游村</strong>停留，伴着炸香蕉与新鲜椰子等当地小吃，欣赏美丽的日落。 晚餐为自选，安排在当地餐厅，之后送返酒店。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 11 hari 4 (itinerary 6912)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6912', 'zh', '送往机场 – 出发', '<p style="text-align:justify;">在酒店享用早餐并办理退房手续后，导游将接团直接送往机场，搭乘返程航班。行程结束。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 10 hari 1 (itinerary 6913)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6913', 'zh', '抵达 – 美娜多市区之旅 – 马卡特特山 – SunBae 美娜多', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉机场后，导游将迎接团员并展开美娜多市区之旅。参观市中心、<strong>唐人街</strong>，以及建于 18 世纪、约有 300 年历史的美娜多最古老庙宇<strong>万兴宫</strong>。&nbsp;随后经过荷兰殖民时期建立的北苏拉威西第一座新教教堂<strong>森特鲁姆教堂</strong>，以及纪念 1942 年美娜多遭日军摧毁的<strong>第二次世界大战纪念碑</strong>。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">接着前往<strong>芝达兰</strong>环路地区，参观<strong>耶稣赐福像</strong>——这座耶稣像以独特的前倾姿态凌空而立，面向美娜多市区。&nbsp;之后前往<strong>马卡特特山</strong>，海拔 200 米，可俯瞰美娜多市区、<strong>美娜多图阿岛</strong>、<strong>布纳肯岛</strong>、<strong>西拉登岛</strong>、辽阔海面，以及北苏拉威西最高峰<strong>克拉巴特山</strong>。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">晚餐为自选，安排在当地餐厅。餐后可前往美娜多热门海滨聚会点<strong>SunBae</strong>，在众多摊档中享用各式小吃与饮品，感受夜晚的氛围（自选）。之后送往酒店办理入住并休息。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 10 hari 2 (itinerary 6914)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6914', 'zh', '布纳肯观光之旅 – 当地咖啡加工坊 – 购物之旅', '<p style="text-align:justify;">在酒店享用早餐后，导游接团前往<strong>布纳肯岛</strong>。从酒店出发前往美加玛斯码头，再乘船约 30 分钟横渡至布纳肯。 如今布纳肯岛建成了新的<strong>布纳肯旅游码头（新布纳肯）</strong>，更具魅力，是拍照录像的绝佳地点。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">随后前往探索以缤纷珊瑚礁与丰富热带海洋生物闻名的<strong>布纳肯海洋公园</strong>之美。可自选<i></i><strong> 浮潜或潜水</strong>活动，也可悠闲漫步，感受布纳肯的海滩氛围。&nbsp; 午餐为自选，安排在当地餐厅。餐后可继续享有自由时间，进行浮潜/潜水（自选）。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">返回美加玛斯码头，随后参观<strong>当地咖啡加工坊</strong>，品尝正宗的北苏拉威西咖啡风味。之后前往<strong>纪念品购物区</strong>，选购各式美娜多特产（或先返回酒店，晚餐前再次接送）。 晚餐为自选，安排在当地餐厅，之后送返酒店。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 10 hari 3 (itinerary 6915)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6915', 'zh', '米纳哈萨高原之旅', '<p style="text-align:justify;">在酒店享用早餐后，导游接团前往<strong>米纳哈萨高原</strong>全日游，途经蒂诺尔地区，可在海拔 500 米处俯瞰美娜多市区。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">抵达托莫洪后，参观<strong>彩虹旅游公园</strong>，欣赏各色缤纷花卉之美。接着前往<strong>托莫洪极限市场</strong>，可见到蝙蝠、林鼠、蛇等各类野生动物的肉品。在另一处地点，还可观看<strong>现场制作</strong>美娜多传统糕点的过程，如<i>cucur</i>、<i>红糖 apang</i>、<i>dodol</i> 等当地小吃。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">行程继续前往<strong>图尔马塞林</strong>的糖棕林，那里有多处适合拍照打卡的景致。在这里，还可观看以糖棕树汁发酵蒸馏制成的当地传统酒<strong>&ldquo;Cap Tikus&rdquo;</strong>的酿造过程。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">午餐为自选，安排在当地餐厅。餐后前往<strong>布吉卡西</strong>，这处独特的自然景点有活跃的硫磺火山口和通往山顶的阶梯，既能远眺秀丽景色，也能感受别具一格的文化体验。此地还有天然硫磺温泉，可游泳或泡脚放松（自选）。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">接着参观<strong>利诺湖</strong>，这座硫磺湖以变幻不定的湖水色彩与秀美宁静的风光闻名，并奉上咖啡或茶。之后返回美娜多市区。晚餐为自选，安排在当地餐厅，之后送返酒店。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 10 hari 4 (itinerary 6916)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6916', 'zh', '利哈加岛 – 布多旅游村', '<p style="text-align:justify;">在酒店享用早餐后，导游接团前往利库邦地区，距美娜多市中心约 1 小时 20 分钟车程。第一站是<strong>塞雷港</strong>，抵达后再乘船约 15 分钟前往<strong>利哈加岛</strong>。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">在<strong>利哈加岛</strong>，可尽情享受迷人的白色细沙海滩，环岛游览，并在多处美丽的拍照打卡点留影。也可自选浮潜、独木舟或潜水活动。午餐安排在岛上供应。餐后可利用额外的自由时间在海滩边放松。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">返回美娜多途中，将在<strong>布多旅游村</strong>停留，伴着炸香蕉与新鲜椰子等当地小吃，欣赏美丽的日落。 晚餐为自选，安排在当地餐厅，之后送返酒店。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 10 hari 5 (itinerary 6917)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6917', 'zh', '送往机场 – 出发', '<p style="text-align:justify;">在酒店享用早餐并办理退房手续后，导游将接团直接送往机场，搭乘返程航班。行程结束。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 28 hari 1 (itinerary 6922)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6922', 'zh', '抵达美娜多 - 天堂高尔夫度假村', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉国际机场后，我们的团队将迎接您，并直接送往坐落于北苏拉威西海岸、环境宁静景致清新的天堂酒店 &amp; 高尔夫度假村。</p><p style="text-align:justify;">前往度假村车程约 60–90 分钟。抵达后办理入住，其余时间可自由休息或享用度假村设施，感受悠闲氛围与清新空气，欣赏绵延于秀美热带风光之中的高尔夫球场景致。</p><p style="text-align:justify;">当晚入住天堂酒店 &amp; 高尔夫度假村。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 28 hari 2 (itinerary 6923)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6923', 'zh', '天堂高尔夫体验（18 洞）', '<p style="text-align:justify;">在酒店享用早餐后，正是在北苏拉威西最佳高尔夫球场之一挥杆一轮的好时机。</p><p style="text-align:justify;">尽享包含球车与球童服务的完整 18 洞高尔夫。球场兼具挑战性球道与迷人自然全景，无论是经验丰富的球手还是新手都能尽兴而归。</p><p style="text-align:justify;">球局结束后，您可在度假村自由放松、欣赏周边风光，或与家人及旅伴共度时光。</p><p style="text-align:justify;">当晚入住天堂酒店 &amp; 高尔夫度假村。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 28 hari 3 (itinerary 6924)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6924', 'zh', '利哈加岛白沙假期', '<p style="text-align:justify;">早餐后前往塞雷港，乘专属快艇渡海前往利哈加岛——北苏拉威西最美的热带岛屿之一，以格外细腻的白沙与澄澈碧绿的海水著称。</p><p style="text-align:justify;">在此享受海滩休闲时光，游泳、拍照，或单纯感受这座未受破坏的岛屿之美。若想更有活力，可自选浮潜、独木舟或玻璃底船，探索岛屿周边的水下景致。</p><p style="text-align:justify;">午餐在岛上供应，品尝北苏拉威西特色的现烤鱼配美娜多招牌 dabu-dabu 辣酱。尽享利哈加岛之美后，返回塞雷港并继续返回酒店。</p><p style="text-align:justify;">下午为自由时间，可休息并享受度假村氛围。</p><p style="text-align:justify;">当晚入住天堂酒店 &amp; 高尔夫度假村。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 28 hari 4 (itinerary 6925)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6925', 'zh', '美娜多出发', '<p style="text-align:justify;">早餐与酒店退房后，出发前您将拥有自由时间。</p><p style="text-align:justify;">在约定时间，我们的团队将送您前往美娜多萨姆拉图兰吉国际机场，搭乘后续航班。</p><p style="text-align:justify;">在此旅程结束之际，愿高尔夫与利哈加岛的美景，成为您北苏拉威西假期中一段美好的回忆。</p><p style="text-align:justify;"><strong>行程结束</strong></p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 34 hari 1 (itinerary 6936)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6936', 'zh', '美娜多抵达', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉国际机场后，我们的团队将迎接您，并送往您选定的酒店或度假村办理入住。前往住宿地车程约 30–60 分钟，视地点而定。</p><p style="text-align:justify;">其余时间可自由休息、享用酒店设施，或在北苏拉威西的海岸氛围中放松身心，为次日清晨开始的水下探险做准备。</p><p style="text-align:justify;">当晚入住您选定的酒店或度假村。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 34 hari 2 (itinerary 6937)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6937', 'zh', '布纳肯潜水体验', '<p style="text-align:justify;">早餐后前往布纳肯海洋公园，这里被广泛视为印度尼西亚最佳潜水目的地之一。乘潜水船前往精选潜点，探索壮观的珊瑚墙、色彩斑斓的珊瑚花园，以及生机盎然的海洋生态系统。</p><p style="text-align:justify;">布纳肯以出色的墙潜与极佳的水下视野著称，还有机会遇见栖息于礁壁的绿海龟与玳瑁，以及种类繁多的热带珊瑚礁鱼类，偶尔还可见到梭鱼与礁鲨等掠食者。潜水结束后返回酒店享用午餐并享有自由时间。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 34 hari 3 (itinerary 6938)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6938', 'zh', '布纳肯潜水体验', '<p style="text-align:justify;">早餐后再度探索布纳肯的水下之美。今天将前往另一处独具特色的潜点，融合珊瑚花园、礁壁与丰富的海洋生物。</p><p style="text-align:justify;">把握机会观察种类繁多的热带海洋生物，从色彩斑斓的珊瑚礁鱼类，到藏身珊瑚间的各种小型生物。完成潜水行程后返回酒店休息，享受悠闲的下午。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 34 hari 4 (itinerary 6939)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6939', 'zh', '图南瀑布 &amp; 唐科科野生动物之旅', '<p style="text-align:justify;">早餐后前往塔拉万地区，探访深藏于热带雨林中的图南瀑布。这道瀑布从约 86 米高处倾泻而下，营造出清爽的自然景致，是北苏拉威西的隐世美景之一。</p><p style="text-align:justify;">行程继续前往唐科科自然保护区——北苏拉威西最知名的野生动物保护区。在经验丰富的当地护林员陪同下，穿越雨林进行轻松徒步，寻找自然栖息地中自由生活的特有物种，如 Yaki（苏拉威西黑冠猕猴）、眼镜猴、犀鸟与袋貂。</p><p style="text-align:justify;">结束这段独特的野生动物体验后，返回美娜多并回到酒店。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 34 hari 5 (itinerary 6940)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6940', 'zh', '美娜多出发', '<p style="text-align:justify;">早餐与退房后，将有人接您并送往美娜多萨姆拉图兰吉国际机场，配合您的航班时间安排。</p><p style="text-align:justify;">在此旅程结束之际，愿探索布纳肯水下美景与在唐科科邂逅苏拉威西特有野生动物的经历，成为您在北苏拉威西时光中一段难忘的回忆。</p><p style="text-align:justify;"><strong>行程结束</strong></p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 16 hari 1 (itinerary 6973)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('6973', 'zh', '行程安排', '<p style="text-align:justify;">全体团员前往位于<strong>塔拉万村</strong>的<strong>图南瀑布</strong>。图南瀑布的水源来自山间河流，沿着约 <strong>86 米高</strong>的陡峭崖壁奔涌而下。原始森林与自然环境更为这处景致增添了几分秀美。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">随后在当地餐厅享用午餐。行程继续前往<strong>唐科科自然保护区</strong>。在通往印度尼西亚最重要保护区之一的路上，请放松身心，欣赏沿途村落与风光。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">保护区位于<strong>比通西北约 20 公里</strong>处，坐落在丘陵与山谷之间。抵达后将有<strong>当地护林员</strong>迎接，带您穿行林间，寻找在自然栖息地自由生活的各种野生动物。请备好相机——您有机会见到<strong>苏拉威西黑冠猕猴（Yaki）</strong>、<strong>眼镜猴（世界上最小的灵长类动物）</strong>，以及<strong>犀鸟</strong>与<strong>袋貂（大眼有袋动物）</strong>。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">野生动物探访结束后返回美娜多。行程结束。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 38 hari 1 (itinerary 7358)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7358', 'zh', '行程安排', '<p style="text-align:justify;">早餐后，我们的团队将到美娜多市区的酒店接您。随后前往塞雷利库邦码头，沿途可欣赏北苏拉威西特有的海岸与乡野风光。抵达码头后，乘专属快艇前往利哈加岛——一座以细软白沙、碧绿海水与原始风貌闻名的热带岛屿。</p><p style="text-align:justify;">在利哈加岛，您可自由安排时间，在沙滩上放松、在清澈海水中畅游，或环岛漫步，从最佳角度记录岛屿的自然之美。若想更有活力，可自选浮潜、独木舟与潜水，欣赏保存完好的水下景致。午餐在岛上供应，伴着热带的宁静氛围。</p><p style="text-align:justify;">下午乘船返回塞雷利库邦码头，再前往美娜多市区。回酒店前，可在美娜多特产中心选购当地美食、手工艺品与北苏拉威西纪念品。购物结束后送您回酒店。</p><p style="text-align:justify;"><strong>行程结束</strong></p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 18 hari 1 (itinerary 7359)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7359', 'zh', '行程安排', '<p style="text-align:justify;">上午接您前往距美娜多市区约 1 小时 15 分钟车程的<strong>马哈乌火山</strong>。马哈乌火山是造访美娜多的旅客与登山爱好者的热门去处。登山步道约有 150 级水泥台阶，攀登相对轻松，沿途设有金属扶手可供借力。登顶后，可饱览美娜多图阿岛、布纳肯与美娜多市区的壮丽全景。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">随后前往托莫洪新兴景点<strong>特特塔纳山丘</strong><strong>顶</strong>。这里不仅可以远眺北苏拉威西省四个地区，还能欣赏被缤纷花园环绕的山丘美景。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">之后前往当地餐厅享用午餐。餐后返回美娜多市区，于指定接送地点送回。行程结束。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 37 hari 1 (itinerary 7474)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7474', 'zh', '美娜多抵达', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉国际机场后，我们的团队将迎接您，并送往您选定的酒店或度假村办理入住。</p><p style="text-align:justify;">其余时间可自由休息、恢复旅途疲惫，享用度假村设施，或在北苏拉威西的热带氛围中放松身心。入住布纳肯岛的旅客将转乘船只前往度假村，随后享有自由时间，尽情感受岛屿与周边海域之美。</p><p style="text-align:justify;">当晚入住您选定的酒店或度假村。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 37 hari 2 (itinerary 7475)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7475', 'zh', '布纳肯潜水体验', '<p style="text-align:justify;">早餐后，潜水探险从布纳肯海洋公园精选的顶级潜点展开。这一带以壮观的垂直珊瑚墙、色彩斑斓的珊瑚花园以及非凡的海洋生物多样性著称。</p><p style="text-align:justify;">潜水过程中，您可能见到栖息于珊瑚墙上的绿海龟与玳瑁、种类繁多的热带鱼类，以及偶尔游过的梭鱼与礁鲨等掠食者。完成潜水行程与午餐后，返回度假村在海滩边放松或享用度假村设施。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 37 hari 3 (itinerary 7476)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7476', 'zh', '深入探索布纳肯的水下天堂', '<p style="text-align:justify;">早餐后继续探索布纳肯的水下世界。今天将前往另一处风格迥异的潜点，从开阔的珊瑚花园与秀美的礁壁斜坡，到布纳肯海洋公园著称的深水崖壁。</p><p style="text-align:justify;">除了体型较大的海洋生物外，布纳肯还栖息着许多引人入胜的小型生物，如藏身珊瑚间的海蛞蝠、狮子鱼、海马、虾与蓑鲉。潜水结束后返回度假村，在宁静的岛上氛围中享受自由时间放松身心。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 37 hari 4 (itinerary 7477)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7477', 'zh', '美娜多出发', '<p style="text-align:justify;">早餐与退房后，将有人从您的酒店或度假村接您，并送往美娜多萨姆拉图兰吉国际机场，配合您的航班时间安排。入住布纳肯岛的旅客将先乘船转乘至美娜多本岛，再继续前往机场。</p><p style="text-align:justify;"><strong>行程结束</strong></p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 31 hari 1 (itinerary 7478)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7478', 'zh', '抵达美娜多 - 天堂高尔夫度假村', '<p style="text-align:justify;">抵达美娜多萨姆拉图兰吉国际机场，或在约定的接送地点，我们的团队将迎接您，并送往位于北苏拉威西海岸的天堂酒店 &amp; 高尔夫度假村。车程约 60–90 分钟，沿途尽是青翠景致与宁静乡野。</p><p style="text-align:justify;">抵达度假村后办理入住，可自由享受休息时光或游览园区。感受悠闲氛围、秀美的高尔夫球场景致，以及让这座度假村成为逃离日常的理想去处的清新海风。</p><p style="text-align:justify;">当晚入住天堂酒店 &amp; 高尔夫度假村。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 31 hari 2 (itinerary 7479)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7479', 'zh', '天堂高尔夫体验（18 洞）', '<p style="text-align:justify;">在酒店享用早餐后，正是挥杆天堂高尔夫球场的好时机。球场兼具挑战性球道与令人惊艳的热带全景，无论新手还是经验丰富的球手都能尽兴而归。</p><p style="text-align:justify;">18 洞球局已包含果岭费、球车与球童服务，让您尽享舒适的挥杆体验。之后可在度假村自由放松、使用酒店设施，或参与度假村内提供的浮潜、玻璃底船等自选活动。</p><p style="text-align:justify;">傍晚时分，在度假村的宁静中欣赏北苏拉威西海岸的日落。</p><p style="text-align:justify;">当晚入住天堂酒店 &amp; 高尔夫度假村。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 31 hari 3 (itinerary 7480)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7480', 'zh', '美娜多出发', '<p style="text-align:justify;">在酒店享用早餐后，退房前仍有自由时间。出发前还可感受度假村氛围，或在园区周边拍照留念。</p><p style="text-align:justify;">在约定时间，我们的团队将送您前往美娜多萨姆拉图兰吉国际机场，或美娜多市区的目的地，以便继续您的后续行程。</p><p style="text-align:justify;">在此行程结束之际，愿高尔夫与北苏拉威西的热带氛围，成为一段愉快而难忘的经历。</p><p style="text-align:justify;"><strong>行程结束</strong></p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 23 hari 1 (itinerary 7481)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7481', 'zh', '抵达 – 探访图南瀑布', '<p style="text-align:justify;">上午抵达美娜多。与导游会合后，前往&nbsp;<strong>图南瀑布</strong>，这座瀑布位于&nbsp;<strong>塔拉万村</strong>。&nbsp;<strong>图南瀑布</strong>&nbsp;的水源来自山上的河流，水流相当湍急地沿着约 86 米高的陡峭崖壁倾泻而下。至今仍保持原始自然的森林氛围，为&nbsp;<strong>图南瀑布</strong>&nbsp;自然旅游景点增添了几分秀美。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">&nbsp;我们随即驱车前往&nbsp;<strong>唐科科国家公园</strong>&nbsp;<i>（若您于下午抵达，则略过图南瀑布行程，直接前往唐科科的巴图普提村）</i>。傍晚时分，在林中进行一段短途徒步，寻找公园的明星物种：眼镜猴——地球上最小的哺乳动物。当晚入住唐科科圣所别墅。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 23 hari 2 (itinerary 7482)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7482', 'zh', '唐科科全日游', '<p style="text-align:justify;">在民宿享用早餐后，前往唐科科自然保护区探寻北苏拉威西的特有物种。寻找黑冠猕猴（北苏拉威西特有的黑猴）、另一种明星动物眼镜猴（世界上最小的灵长类动物）、袋貂，以及众多鸟类。这座国家公园是全球犀鸟数量最多的地方，其中包括冠斑犀鸟。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">午餐后，下午再次深入唐科科丛林探访。当晚入住民宿。&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 23 hari 3 (itinerary 7483)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7483', 'zh', '萨旺安瓦鲁加 – 米纳哈萨高原之旅', '<p style="text-align:justify;">早餐后办理退房，驱车前往高原地区，随后前往&nbsp;<strong>萨旺安瓦鲁加</strong>，途中在米纳哈萨人的古代墓葬（巨石时代）稍作停留。午餐安排在&nbsp;<strong>通达诺湖</strong>。接着前往托莫洪参观&nbsp;<strong>传统市场</strong>，之后造访&nbsp;<strong>沃洛安村</strong>&nbsp;的组装式木屋产业（当地居民在此建造精美的米纳哈萨式木屋，可拆解后运出村外），最后在&nbsp;<strong>托莫洪 Kai&rsquo;santi</strong>&nbsp;拍照，背景是洛孔火山与青翠稻田。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">下午在&nbsp;<strong>利诺湖</strong>&nbsp;品咖啡或茶。之后入住托莫洪的度假酒店。&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 23 hari 4 (itinerary 7484)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7484', 'zh', '马哈乌火山徒步 – 布纳肯岛', '<p style="text-align:justify;">在酒店享用早餐后办理退房。与导游会合，前往&nbsp;<strong>马哈乌火山口</strong>。徒步 10 分钟抵达火山口边缘，便可饱览托莫洪与美娜多以及远方岛屿的壮丽景色；在火山口底部，可见蒸腾的湖水并闻到池中散出的硫磺气味。午餐后乘船前往布纳肯岛（约 45 分钟船程）。&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;"><strong>布纳肯海洋公园</strong>&nbsp;位于印度尼西亚北苏拉威西、布纳肯岛以东，以令人惊叹的水下景观闻名。公园面积约 89,065 公顷，是全球潜水者与浮潜者的热门目的地。住宿安排在布纳肯岛上的度假村&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 23 hari 5 (itinerary 7485)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7485', 'zh', '布纳肯岛（游泳 / 浮潜）', '<p style="text-align:justify;">在印度尼西亚最美的浮潜地点之一尽情享受海洋之乐。我们置身于壮丽的生态系统之中，这里有 500 多种珊瑚与约 1,500 种鱼类，无害的礁鲨与海龟也常在岛屿周边出没。</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;"><strong>备注：</strong> <i>可自选租用浮潜装备从海滩下水，或预订乘船行程。也可安排潜水（现场预约并付费）&nbsp;</i></p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 23 hari 6 (itinerary 7486)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7486', 'zh', '送往机场', '<p style="text-align:justify;">在酒店享用早餐后办理退房。乘船返回美娜多，随后由导游送往机场搭机离开。行程结束，谢谢。&nbsp;</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 40 hari 1 (itinerary 7763)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7763', 'zh', '行程安排', '<p style="text-align:justify;">早餐后，我们将到美娜多市中心的酒店接您，前往<strong>巴霍沃码头</strong>。从码头乘专属快艇继续前往<strong>美娜多图阿岛</strong>。</p><p style="text-align:justify;">抵达后，约 3 小时的美娜多图阿山徒步就此展开。步道穿过热带森林与村民的肉豆蔻、丁香、椰子、香蕉、芒果等热带作物种植园。沿途可饱览自然风光，运气好的话还能见到<strong>眼镜猴、Yaki（黑冠猕猴）与各种特有鸟类</strong>等苏拉威西特有野生动物。</p><p style="text-align:justify;">徒步结束后乘船前往<strong>布纳肯国家公园</strong>。您可尽情探索布纳肯海域之美，浮潜或潜水为自选项目。午餐以餐盒形式供应，可在船上享用。</p><p style="text-align:justify;">游览布纳肯后返回<strong>巴霍沃码头</strong>，再送您回美娜多市区的酒店。</p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();

-- paket 41 hari 1 (itinerary 7765)
INSERT INTO `itinerary_translations` (`itinerary_id`, `locale`, `title`, `description`, `created_at`, `updated_at`)
VALUES ('7765', 'zh', '行程安排', '<p style="text-align:justify;"><strong>上午 &ndash; 接团 &amp; 萨旺安瓦鲁加</strong><br>我们将到美娜多市区的酒店接您，出发前往<strong>萨旺安瓦鲁加</strong>——一处保存着数百座石制瓦鲁加的米纳哈萨古代墓葬群。在这里，您可深入了解米纳哈萨人的历史、传统与文化遗产。</p><p style="text-align:justify;"><strong>巴图安古斯 &amp; 浮潜</strong><br>行程继续前往<strong>巴图安古斯</strong>，这段引人注目的海岸由远古火山熔岩流塑造而成。在当地餐厅享用午餐后，可通过浮潜探索巴图安古斯的水域。清澈的海水让您得以欣赏珊瑚礁、热带鱼与丰富多样的海洋生物。</p><p style="text-align:justify;"><strong>下午 &ndash; 返回美娜多</strong><br>尽享沙滩与浮潜之后，返回美娜多市区。送您回酒店，行程结束。</p><p style="text-align:justify;"><strong>行程结束。</strong></p>', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `updated_at` = NOW();
COMMIT;

-- Periksa hasilnya:
-- SELECT COUNT(*) FROM tour_translations WHERE locale = 'zh';
-- SELECT COUNT(*) FROM itinerary_translations WHERE locale = 'zh';
