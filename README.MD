# �γ̹���ϵͳ

## Ŀ¼�ṹ
```bash
src                                         
    actions/                               + redux���action
    components/                            + ���
    constants/                             + redux��ص�type�����ļ�
    pages/                                 + ҳ��
    reducers/                              + redux��reducer�ļ�
    store/                                 + redux store
    uitls/                                 + ����Ŀ¼
        api.js                                  - �ӿ�·��
        config.js                               - �����ļ�
    app.jsx                                - ����ļ�
```

## ����ָ��
��Ҫ����ջΪTaro��Taro��һ����ѭReact�﷨�淶�Ķ�˿������������   
ʹ�� Taro�����ǿ���ֻ��дһ�״��룬��ͨ�� Taro �ı��빤�ߣ���Դ����   
�ֱ����������ڲ�ͬ�ˣ�΢��/�ٶ�/֧����/�ֽ�����/QQС���򡢿�Ӧ�á�H5��React-Native �ȣ����еĴ���

### ��װ����
```bash
npm install
```

### ע������
����Ŀ�����ǻ������»����汾���������б������밲װ����ָ���汾
Taro cli�汾 v1.3.10
node 10.15.3 (>= 8.0.0)
npm 6.4.1

```bash
Taro�İ�װ
# ʹ�� npm ��װ CLI
$ npm install -g @tarojs/cli
# OR ʹ�� yarn ��װ CLI
$ yarn global add @tarojs/cli
# OR ��װ�� cnpm��ʹ�� cnpm ��װ CLI
$ cnpm install -g @tarojs/cli

Taro�ĸ���
# taro
$ taro update self
# npm
npm i -g @tarojs/cli@latest
# yarn
yarn global add @tarojs/cli@latest
```

### ����
```bash
npm run dev:weapp
```

### �������
```bash
taro build --type weapp
```

## ΢��С����
΢��С����˵ĵ��ԣ���Ҫ��΢�ſ����߹����������Ԥ������󽫿�����ɺ���ļ������ϴ�