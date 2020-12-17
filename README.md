# 시작하기

Clone this -> npm install -> node src/index.js

:boom: Node 시작 전에 _config.js_ 파일을 최상단 디렉토리 안에 넣어 주셈... :boom:

```javascript
** config.js **

module.exports = {
    mongoURI: "mongo_uri"
}
```

## :ok_hand: 기본 스펙

- 코드 샌드박스 주소
> https://hxj8x.sse.codesandbox.io/
- 로그인, 회원가입
- 10 * 10 의 맵
- 캐릭터의 이동
- 이동 시 필드별로 아무일도 일어나지 않음, 전투, 아이템 획득의 일이 일어남.
- 5종 이상의 몬스터
- 5종 이상의 아이템 
- 전투 시스템
> (내 STR+INT) / (내 STR+INT + 적 STR+INT) 확률로 공격 성공
- 사망 시스템
> 레벨은 유지되고, 좌표와 경험치가 초기화된다.
> 아이템을 랜덤하게 하나 잃어버리고, 그 아이템의 능력치만큼 유저의 능력치가 감소한다.
- 레벨 시스템
> 학사(Lv 1-4) -> 석사(Lv 5-8) -> 박사(Lv 9-12) -> 졸업(Lv 13 달성)
>> 레벨 업 할 때마다 최대 HP 증가

## :ok_hand: 추가 스펙

- 체력 회복하는 아이템 존재
- 움직이면 랜덤하게 아이템/몬스터 발견  
- 아이템을 소유할 경우, 캐릭터의 능력치가 향상된다. 능력치가 클라이언트에서 확인이 가능하다.
- 시작 능력치가 랜덤하게 주어지며, 5번에 한하여 재시도가 가능하다.
- 사망시 아이템을 랜덤하게 잃어버린다. 
- 유저의 인벤토리가 클라이언트 상에서 확인이 가능하다.
- 전투 중, 10턴 안에 전투가 끝나지 않거나, 체력이 20% 이하로 감소할 경우 도망가는 선택지가 추가로 주어진다.

<img src=https://user-images.githubusercontent.com/55521320/102441359-71336400-4065-11eb-83d1-21d9ffa6347e.jpg width="50%">
<img src=https://user-images.githubusercontent.com/55521320/102441390-84deca80-4065-11eb-9b18-41d08adc817e.jpg width="50%">
<img src=https://user-images.githubusercontent.com/55521320/102441422-9922c780-4065-11eb-9205-e5221facb908.jpg width="50%">
<img src=https://user-images.githubusercontent.com/55521320/102441438-a17b0280-4065-11eb-8384-497d445e1ece.jpg width="50%">
<img src=https://user-images.githubusercontent.com/55521320/102441439-a2ac2f80-4065-11eb-969e-21cc3cf52a11.jpg width="50%">
<img src=https://user-images.githubusercontent.com/55521320/102441441-a475f300-4065-11eb-96dd-a9fa5e030cfb.jpg width="50%">
<img src=https://user-images.githubusercontent.com/55521320/102441444-a5a72000-4065-11eb-98d8-eb51c2267511.jpg width="50%">
<img src=https://user-images.githubusercontent.com/55521320/102441446-a6d84d00-4065-11eb-9023-a89533b5614d.jpg width="50%">
<img src=https://user-images.githubusercontent.com/55521320/102441455-aa6bd400-4065-11eb-9170-0a1803b435d0.jpg width="50%">
<img src=https://user-images.githubusercontent.com/55521320/102441466-acce2e00-4065-11eb-8c02-ffb2f257da70.jpg width="50%">
<img src=https://user-images.githubusercontent.com/55521320/102441470-af308800-4065-11eb-8900-2f205c5782ae.jpg width="50%">
<img src=https://user-images.githubusercontent.com/55521320/102441472-b061b500-4065-11eb-94d8-38c9c72c9cdd.jpg width="50%">
<img src=https://user-images.githubusercontent.com/55521320/102441480-b3f53c00-4065-11eb-99eb-2bbd5087da2a.jpg width="50%">
<img src=https://user-images.githubusercontent.com/55521320/102441490-b8215980-4065-11eb-8b7b-71b2ae9aabb0.jpg width="50%">
<img src=https://user-images.githubusercontent.com/55521320/102441492-b9528680-4065-11eb-8543-2256a3387fd9.jpg width="50%">
