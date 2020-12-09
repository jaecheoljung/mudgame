# 시작하기

Clone this repository \
-> npm install        \
-> modify files       \
-> push requests

*Node 시작 전에 _config.js_ 파일을 최상단 디렉토리 안에 넣어 주셈...*

```javascript
** config.js ** 

module.exports = {
    secret: 'secret_key',
    mongoURI: "mongo_uri"
}
```

## 기본스펙

뼈대 코드를 기본으로 하여 다음이 구현되어 있어야 한다.  
모든 행동들은 서버에서 이루어지나, 클라이언트에서 별도로 확인이 가능하여야 한다.(html 결과창에 결과가 프린트되면된다)
- 온라인에서 플레이가 가능하다( codesandbox 등을 활용)  
- 로그인, ~~회원가입~~
- ~~10 * 10 이상의 맵~~
- ~~캐릭터의 이동~~
- ~~이동 시 필드별로 아무일도 일어나지 않음, 전투, 아이템 획득의 일이 일어남.~~
- ~~5종 이상의 몬스터~~ 
- ~~5종 이상의 아이템~~  
- 전투 시스템( str, def, hp 개념을 활용)  
- ~~사망 시스템(전투 시 hp가 0이될 경우 캐릭터, 가 사망. 0,0 위치로 이동)~~
- ~~레벨 시스템( 일정 이상 경험치 획득 시 캐릭터 레벨업.)~~

## 추가스펙

추가 스펙은 조별로 구현가능한 부분을 구현하면 된다.


- 체력회복하는 이벤트가 추가된다.
- 필드에서 일어나는 이벤트 중 랜덤이벤트가 존재한다.  
- 아이템을 소유할 경우, 캐릭터의 능력치가 향상된다. 능력치가 클라이언트에서 확인이 가능하다.  
- 시작 능력치가 랜덤하게 주어지며, 5번에 한하여 재시도가 가능하다. 
- 사망시 랜덤하게 아이템을 잃어버린다.  
- ~~유저의 인벤토리가 클라이언트 상에서 확인이 가능하다.~~
- 전투 중, 10턴 안에 전투가 끝나지 않거나, 체력이 20% 이하로 감소할 경우 도망가는 선택지가 추가로 주어진다.

## 구현해둔 것 

1207
1. 10X10 맵 구축해두었고, 맵간 이동 잘 되게 해두었습니다. 
2. 미니맵 제작했습니다. 작업하는데 편의를 높이기 위해서!
3. 회원가입까지는 이미 구현이 되어있었는데, 로그인 기능은 안되어있네요 이부분 나중에 추가해야할 것 같습니다. 

1208
1. 레벨이랑 경험치 구현했습니다. 레벨별 경험치는 일단 100으로 통일했고, 획득한 경험치가 100을 넘어가면 레벨업이 되며 잔여 경험치만큼이 남습니다. 
    (1렙 90exp 에서 40exp획득시 2렙 30exp가 됩니다.) 획득 경험치가 매우 크면 2렙, 3렙업도 가능하게 짜두었습니다. 
2. 인벤토리 만들었습니다. 
    서버측 아이템 목록을 "itemId":"description" 의 object로 만들어 두었고, 
    player.getItem("itemId"); 와 같은 코드로 아이템 획득이 가능합니다. 
    현재는 아이템 중복 획득이 가능하고 인벤에 1개씩 다 표시되는데, 이런 세부 셋팅은 추후 논의하면 될 것 같습니다. 
3. 사망시 경험치, 좌표 초기화 메소드 만들었습니다. 
4. 전투 시스템부터 틀을 잡아 놔야 이후 다른 기능 구현이 수월할 것 같습니다! 

1209
1. 5종 이상의 몬스터, 5종 이상의 아이템 구현했습니다.  
2. map.json을 보시면 아시겠지만, 4:3:3 정도 비율로 아무일도 일어나지 않음/몬스터 등장/아이템 획득이 일어나도록 구현했습니다.  
3. map.json에서 몬스터 등장/아이템 획득의 이벤트의 경우, 각 events[0]에는 배틀이 있을 확률을 적용했습니다! action.js에서는 이 확률에 맞게, 나름 랜덤하게 배틀/아이템 획득이 있게 됩니다.  
4. 아이템 획득시 맵 위에 뜨는 description이 이에 맞게 변화하도록 구현했습니다. 또한, 획득한 아이템이 inventory 목록에 추가되도록 하였습니다.  
5. 앞으로 str,def,hp를 반영한 전투시스템을 어떻게 구현할지 논의해보면 좋을 것 같습니다.  
  
