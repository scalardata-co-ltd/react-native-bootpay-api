import React, { useRef, useEffect }  from 'react';
import { BackHandler } from 'react-native';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { BootpayWebView, userTrace, pageTrace } from 'react-native-bootpay-api';  



export default function App() {
  const bootpay = useRef<BootpayWebView>(null);
  // const api = useRef<BootpayAnalytics>(null);

  const onAndroidBackPress = (): boolean => {
    console.log(1234);
    // if (bootpay.current) {
    //   if(bootpay.current.canGoBack()) {
    //     bootpay.current.goBack();
    //   } else {
    //     bootpay.current.dismiss();
    //   }
    //   return true; // prevent default behavior (exit app)
    // }
    return false;
  };

  useEffect((): (() => void) => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return (): void => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, []); // Never

  const onAnalyticsPress = async () => {

    
    //회원 추적
    await userTrace(
      '5b8f6a4d396fa665fdc2b5e9',
      'user_1234',
      '01012345678',
      'rupy1014@gmail.com',
      1,
      '861014',
      '서울'
    );

    //결제되는 상품정보들로 통계에 사용되며, price의 합은 결제금액과 동일해야함 
    const items = [
      {
        item_name: '키보드', //통계에 반영될 상품명  
        unique: 'ITEM_CODE_KEYBOARD', //개발사에서 관리하는 상품고유번호 
        price: 1000, //상품단가 
        cat1: '패션', //카테고리 상 , 자유롭게 기술
        cat2: '여성상의', //카테고리 중, 자유롭게 기술 
        cat3: '블라우스', //카테고리 하, 자유롭게 기술
      },
      {
        item_name: '마우스', //통계에 반영될 상품명  
        unique: 'ITEM_CODE_KEYBOARD', //개발사에서 관리하는 상품고유번호 
        price: 2000, //상품단가 
        cat1: '패션2', //카테고리 상 , 자유롭게 기술
        cat2: '여성상의2', //카테고리 중, 자유롭게 기술 
        cat3: '블라우스2', //카테고리 하, 자유롭게 기술
      }
    ]

    //페이지 추적 
    await pageTrace(
      '5b8f6a4d396fa665fdc2b5e9',
      'main_page_1234',
      '',
      items
    );
  }
  

  const onPayPress = () => {    
    console.log('onPayPress');

    const payload = {
      pg: 'danal',  //['kcp', 'danal', 'inicis', 'nicepay', 'lgup', 'toss', 'payapp', 'easypay', 'jtnet', 'tpay', 'mobilians', 'payletter', 'onestore', 'welcome'] 중 택 1
      name: '마스카라', //결제창에 보여질 상품명
      order_id: '1234_1234', //개발사에 관리하는 주문번호 
      method: 'phone', 
      price: 1000 //결제금액 
    } 

    //결제되는 상품정보들로 통계에 사용되며, price의 합은 결제금액과 동일해야함 
    const items = [
      {
        item_name: '키보드', //통계에 반영될 상품명 
        qty: 1, //수량 
        unique: 'ITEM_CODE_KEYBOARD', //개발사에서 관리하는 상품고유번호 
        price: 1000, //상품단가 
        cat1: '패션', //카테고리 상 , 자유롭게 기술
        cat2: '여성상의', //카테고리 중, 자유롭게 기술 
        cat3: '블라우스', //카테고리 하, 자유롭게 기술
      }
    ]

    //구매자 정보로 결제창이 미리 적용될 수 있으며, 통계에도 사용되는 정보 
    const user = {
      id: 'user_id_1234', //개발사에서 관리하는 회원고유번호 
      username: '홍길동', //구매자명
      email: 'user1234@gmail.com', //구매자 이메일
      gender: 0, //성별, 1:남자 , 0:여자
      birth: '1986-10-14', //생년월일 yyyy-MM-dd
      phone: '01012345678', //전화번호, 페이앱 필수 
      area: '서울', // [서울,인천,대구,광주,부산,울산,경기,강원,충청북도,충북,충청남도,충남,전라북도,전북,전라남도,전남,경상북도,경북,경상남도,경남,제주,세종,대전] 중 택 1
      addr: '서울시 동작구 상도로' //주소
    }


    //기타 설정
    const extra = {
      app_scheme: "bootpayrnapi", //ios의 경우 카드사 앱 호출 후 되돌아오기 위한 앱 스키마명 
      expire_month: "0", //정기결제가 적용되는 개월 수 (정기결제 사용시), 미지정일시 PG사 기본값에 따름
      vbank_result: true, //가상계좌 결과창을 볼지(true), 말지(false)
      start_at: "",  //정기 결제 시작일 - 지정하지 않을 경우 - 그 날 당일로부터 결제가 가능한 Billing key 지급, "2020-10-14"
      end_at: "", // 정기결제 만료일 - 기간 없음 - 무제한, "2020-10-14"
      quota: "0,2,3",  //결제금액이 5만원 이상시 할부개월 허용범위를 설정할 수 있음, [0(일시불), 2개월, 3개월] 허용, 미설정시 12개월까지 허용
      offer_period: "", //결제창 제공기간에 해당하는 string 값, 지원하는 PG만 적용됨
      popup: 1, //1이면 popup, 아니면 iframe 연동
      quick_popup: 1, //1: popup 호출시 버튼을 띄우지 않는다. 아닐 경우 버튼을 호출한다
      locale: "ko", 
      disp_cash_result: "Y",  // 현금영수증 보일지 말지.. 가상계좌 KCP 옵션
      escrow: "0",  // 에스크로 쓸지 안쓸지
      theme: "purple", 
      custom_background: "", 
      custom_font_color: "", 
      show_close_button: true 
    } 

    if(bootpay != null && bootpay.current != null) bootpay.current.request(payload, items, user, extra);
  }


  const onCancel = (data: string) => {
    console.log('cancel', data);

    var json = JSON.stringify(data) 
    console.log('cancel json', json);
  }

  const onError = (data: string) => {
    console.log('error', data);
  }

  const onReady = (data: string) => {
    console.log('ready', data);
  }

  const onConfirm = (data: string) => {
    console.log('confirm', data);
    if(bootpay != null && bootpay.current != null) bootpay.current.transactionConfirm(data);
  }

  const onDone = (data: string) => {
    console.log('done', data);
  }

  const onClose = () => {
    console.log('closed');
  }

  // React.useEffect(() => {
  //   BootpayApi.multiply(3, 7).then(setResult);
  // }, []);

  return (
    <View style={styles.container}>

      <BootpayWebView  
        ref={bootpay}
        ios_application_id={'5b8f6a4d396fa665fdc2b5e9'}
        android_application_id={'5b8f6a4d396fa665fdc2b5e8'} 
        onCancel={onCancel}
        onError={onError}
        onReady={onReady}
        onConfirm={onConfirm}
        onDone={onDone}
        onClose={onClose} 
      />
 
      <TouchableOpacity
          style={styles.button}
          onPress={onAnalyticsPress}
        >
          <Text>analytics click</Text>
      </TouchableOpacity> 

      <TouchableOpacity
          style={styles.button}
          onPress={onPayPress}
        >
          <Text>pay click</Text>
      </TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#00DDDD",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});
 