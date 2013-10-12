enchant();

window.onload = function hidamari_swing() {
	var game = new Game(480, 480);
	game.keybind(32, "space");  // spaceキー
	game.preload(
		//Background
		'img/background_title.jpg', 'img/background_batting.jpg',
		//title chara
		'img/logo.png', 'img/direction.gif', 'img/switch.gif', 'img/sound.gif', 'img/sound_n.gif',
		//batting chara
		'img/yuno.gif', 'img/bat.gif', 'img/miyako.gif', 'img/meetcursor.png',
		'img/ball.gif', 'img/throw_ball.gif', 'img/ball_shadow.gif',
		'img/swing_button.png',
		'img/effect_line.gif', 'img/effect_hit.gif',
		//BGM
		'sound/bgm_easy.mp3', 'sound/bgm_normal.mp3',
		'sound/bgm_hard.mp3', 'sound/bgm_extra1.mp3', 'sound/bgm_extra2.mp3',
		'sound/bgm_result.mp3',
		//SE
		'sound/hit_ex.wav', 'sound/hit_1.wav', 'sound/hit_2.wav', 'sound/hit_3.wav', 'sound/hit_4.wav'
	);
//**********
//コンフィグ定数
//**********
	//画面サイズ
	var SCREEN_SIZE_X = 480, SCREEN_SIZE_Y = 480;
	//グラウンド全体サイズ
	var GROUND_SIZE_X = 2400, GROUND_SIZE_Y = 1600;
	//スタートボタン位置
	var STARTBUTTON_X = 90, STARTBUTTON_Y = 300;
	//矢印サイズ
	var DIRECTION_SIZE = 40;
	//BGM
	var BATTING_BGM_EASY = 'sound/bgm_easy.mp3';
	var BATTING_BGM_NORMAL = 'sound/bgm_normal.mp3';
	var BATTING_BGM_HARD = 'sound/bgm_hard.mp3';
	var BATTING_BGM_EXTRA1 = 'sound/bgm_extra1.mp3';
	var BATTING_BGM_EXTRA2 = 'sound/bgm_extra2.mp3';
	var RESULT_BGM = 'sound/bgm_result.mp3';

	//バッティング画面-デフォルトカメラ位置
	var CAMERA_BATTING_X = -(GROUND_SIZE_X/2 - SCREEN_SIZE_X/2);
	var CAMERA_BATTING_Y = -(GROUND_SIZE_Y - SCREEN_SIZE_Y);
	//表示系の枠
	var STATES_X = 370, STATES_Y = 10;
	//残り球数
	var BALL_NUM = 10, BALL_KNOCK_NUM = 100; //100本ノック
	//残り球数表示位置
	var LASTBALL_X = 5, LASTBALL_Y = 10;
	//得点表示位置
	var POINT_X = 5, POINT_Y = 30;
	//ピッチャー-サイズ
	var PITCHER_SIZE_X = 96, PITCHER_SIZE_Y = 96;
	//ピッチャー-位置
	var PITCHER_X = (CAMERA_BATTING_X * -1) + SCREEN_SIZE_X/2 - PITCHER_SIZE_X/2 + 10;
	var PITCHER_Y = (CAMERA_BATTING_Y * -1) + SCREEN_SIZE_X/2 - PITCHER_SIZE_X/2 - 190;
	//ピッチャー-モーション数
	var PITCHER_MOTION_NUM = 10-1; //0,1,2,3,4,5,6,7,9
	//ピッチャー-投球間隔(フレーム)
	var PITCH_INTERVAL = 60;
	//バッター-サイズ
	var BATTER_SIZE_X = 128, BATTER_SIZE_Y = 128;
	//バッター-デフォルト位置
	var BATTER_DEFAULT_X = (CAMERA_BATTING_X * -1) + SCREEN_SIZE_X/2 - PITCHER_SIZE_X/2 - 85;
	var BATTER_DEFAULT_Y = (CAMERA_BATTING_Y * -1) + SCREEN_SIZE_X/2 - PITCHER_SIZE_X/2 + 120;
	//バッターボックス制限
	var BATTER_LIMIT_X = 34, BATTER_LIMIT_Y = 30;
	//ミートカーソル-サイズ
	var MEETCURSOR_SIZE_X = 64, MEETCURSOR_SIZE_Y = 50;	
	//ミートカーソル-位置
	var MEETCURSOR_DEFAULT_X = BATTER_DEFAULT_X + 110;
	var MEETCURSOR_DEFAULT_Y = BATTER_DEFAULT_Y + 60;
	//ボール-サイズ
	var BALL_SIZE = 15;
	//ボール-投球直後のデフォルト位置
	var BALL_DEFAULT_X = PITCHER_X + PITCHER_SIZE_X/2 - BALL_SIZE/2 -5;
	var BALL_DEFAULT_Y = PITCHER_Y + 55;
	//十字パッド
	var PAD_X = 0, PAD_Y = SCREEN_SIZE_Y - 100;
	//スイングボタン-サイズ
	var SWINGBUTTON_SIZE = 80;
	//スイングボタン-位置
	var SWINGBUTTON_X = SCREEN_SIZE_X - SWINGBUTTON_SIZE;
	var SWINGBUTTON_Y = SCREEN_SIZE_Y - SWINGBUTTON_SIZE;
	
	//メニューの設定
	var CommonCourse = createCommonCourse();
	var ExtraCourse = createExtraCourse();
	//
	var GameSet = {	
		"COMMON" : {
			"EASY" : {
				"mode" : "通常モード",
				"course_name" : "ほのぼのコース",
				"type_of_pitch" : 1,
				"nock" : 0,
				"ball_number" : 5,
				"powerfilter": 0.85,
				"bgm" : 'sound/bgm_easy.mp3',
				"discription" : "5球 / 芯の大きさ：☆☆☆<br>ボールを打ち返してみよう！"
			},
			"NORMAL" : {
				"mode" : "通常モード",
				"course_name" : "わくわくコース",
				"type_of_pitch" : 2,
				"nock" : 0,
				"powerfilter": 0.9,
				"ball_number" : 10,
				"bgm" : 'sound/bgm_normal.mp3',
				"discription" : "10球 / 芯の大きさ：☆☆<br>変化球も投げてくる！"
			},
			"HARD" : {
				"mode" : "通常モード",
				"course_name" : "どきどきコース",
				"type_of_pitch" : 6,
				"nock" : 0,
				"powerfilter": 1.0,
				"ball_number" : 10,
				"bgm" : 'sound/bgm_hard.mp3',
				"discription" : "10球 / 芯の大きさ：☆<br>上手い人向けの難しめコース！"
			},
			"STRAIGHT" : {
				"mode" : "通常モード",
				"course_name" : "まっすぐコース",
				"type_of_pitch" : 4,
				"nock" : 0,
				"powerfilter": 0.95,
				"ball_number" : 10,
				"bgm" : 'sound/bgm_extra1.mp3',
				"discription" : "10球 / 芯の大きさ：☆<br>直球のみで真剣勝負！"
			},
			"KIRE" : {
				"mode" : "通常モード",
				"course_name" : "きれきれコース",
				"type_of_pitch" : 7,
				"nock" : 0,
				"powerfilter": 0.85,
				"ball_number" : 10,
				"bgm" : 'sound/bgm_extra1.mp3',
				"discription" : "10球 / 芯の大きさ：☆☆☆<br>だんだん難しくなる変化球コース！"
			}
		},
		"EXTRA" : {
			"YUNO" : {
				"mode" : "おまけモード",
				"course_name" : "ゆのさま",
				"type_of_pitch" : 3,
				"nock" : 0,
				"ball_number" : 10,
				"powerfilter": 0.85,
				"bgm" : 'sound/bgm_easy.mp3',
				"discription" : "10球 / 芯の大きさ：☆☆☆<br>森で修行して帰ってきた！"
			},
			"KNOCK" : {
				"mode" : "おまけモード",
				"course_name" : "100本ノック",
				"type_of_pitch" : 5,
				"nock" : 1,
				"powerfilter": 1.0,
				"ball_number" : 100,
				"bgm" : 'sound/bgm_extra2.mp3',
				"discription" : "100球 / 芯の大きさ：☆<br>これはノックと呼べるのか！？とにかく打ちまくれ！"
			},
			"EASY_EX" : {
				"mode" : "おまけモード",
				"course_name" : "ほのぼのコース×☆☆☆",
				"type_of_pitch" : 1,
				"nock" : 0,
				"ball_number" : 5,
				"powerfilter": 1.1,
				"bgm" : 'sound/bgm_easy.mp3',
				"discription" : "5球 / 芯の大きさ：☆<br>統一球になった！目指せ500ｍ！"
			},
			"KNOCK_EX" : {
				"mode" : "おまけモード",
				"course_name" : "バンザイノック",
				"type_of_pitch" : 5,
				"nock" : 1,
				"powerfilter": 0.45,
				"ball_number" : 100,
				"bgm" : 'sound/bgm_extra2.mp3',
				"discription" : "100球 / 芯の大きさ：☆☆☆☆☆<br>わっしょいでーす"
			}
		}
	};
	//
	var Mode = "COMMON";

	var Course = "EASY";
	var CommonCourseIndex = 0;
	var ExtraCourseIndex = 0;

	//音ON/OFF用フラグ
	var SoundFlag = getCookie("SoundFlag");
	function SoundFlagSwitching () {
		if(SoundFlag == 0){
			SoundFlag = 1;
		}else{
			SoundFlag = 0;
		}
		setCookie("SoundFlag",SoundFlag);
	}

	game.onload = function(){
		//var GameMode = 0;
		var BattingBgmFile = '';

		//スペースが押されたとき呼ばれる関数呼ぶ
		function get_space(){
			//タイトル画面ならゲームスタート
			if(game.currentScene === SceneTitle){
				StartButton.game_start();
			}
			//バッティング画面ならスイング
			if(game.currentScene === SceneBatting){
				if(Batter.swing_flag == true){
					Batter.swing();
				}
			}
			//リザルト画面なら決定(選択しなければ発動しない)
			if(game.currentScene === SceneResult){
				SceneResult.decide();
			}
		}

		function play_se(file_pass){
			if(SoundFlag == 1){
				//console.log('play se :'+file_pass);
				var se = game.assets[file_pass];
				se.stop();
				se.play();
			}
		}

		//Sprite生成関数
		function make_Sprite(size_x, size_y, x, y, image_path){
			var TempSprite = new Sprite(size_x, size_y);
			TempSprite.x = x;
			TempSprite.y = y;
			TempSprite.image = game.assets[image_path];
			return TempSprite;
		}
		//*ラベル生成関数*
		function make_Label(x, y, class_name, text){
			//console.log('makelabel');
			var TempLabel = new Label();
			TempLabel.x = x;
			TempLabel.y = y;
			TempLabel.text = "<div class='"+class_name+"'>"+text+"</div>";
			return TempLabel;
		}

//*********************
//タイトル画面
//*******************
 	//*タイトルシーン*
		var SceneTitle = new Scene();
		//矢印キーによるモード選択
		SceneTitle.addEventListener('upbuttondown', function(){
			ModeSwitching();
			StartButton.label_update();
			ModeDiscription.update();
			ModeLabel.update();
		});
		SceneTitle.addEventListener('downbuttondown', function(){
			ModeSwitching();
			StartButton.label_update();
			ModeDiscription.update();
			ModeLabel.update();
		});
		SceneTitle.addEventListener('leftbuttondown', function(){
			CourseDecrement();
			StartButton.label_update();
			ModeDiscription.update();
		});
		SceneTitle.addEventListener('rightbuttondown', function(){
			CourseIncrement();
			StartButton.label_update();
			ModeDiscription.update();
		});

	//*背景*
		var BackgroundTitle = make_Sprite(SCREEN_SIZE_X, SCREEN_SIZE_Y, 0, 0, 'img/background_title.jpg');

	//*ロゴ*
		var TitleLogo = make_Sprite(450, 300, 15, 0, 'img/logo.png');
		TitleLogo.scale(0.9, 0.9);
	
	//*スタートボタン*
		var StartButton = new Label();
		StartButton.num = 1;
		StartButton.x = STARTBUTTON_X;
		StartButton.y = STARTBUTTON_Y;
		StartButton.label_update = function(){
			this.text = "<h1 class='button'>" + GameSet[Mode][Course]["course_name"] + "</h1>"
		};
		StartButton.label_update();
		StartButton.game_start = function(){
			//GameMode = GameSet[Mode][Course]["gamemode_number"];
			BattingBgmFile = GameSet[Mode][Course]["bgm"];
			LastBall.num = GameSet[Mode][Course]["ball_number"];
			LastBall.max = GameSet[Mode][Course]["ball_number"];
			MeetCursor.distance_powerfilter = GameSet[Mode][Course]["powerfilter"];
			//console.log("GameMode : " + GameSet[Mode][Course]["gamemode_number"]);
			//console.log("BGM : " + GameSet[Mode][Course]["bgm"]);
			LastBall.update();
			play_se('sound/hit_1.wav');
			game.popScene(SceneTitle);
			game.pushScene(SceneBatting);
		}
		StartButton.addEventListener('touchstart', function (e) {
			this.game_start();
		});

	//*枠*
		var BackFrame = make_Label(20, SCREEN_SIZE_Y/2+55, "backframe", "");

	//*矢印*
		var ModeLeftButton = make_Sprite(DIRECTION_SIZE, DIRECTION_SIZE, 40, STARTBUTTON_Y+DIRECTION_SIZE/2, 'img/direction.gif');
		ModeLeftButton.addEventListener('touchstart', function (e) {
			CourseDecrement();
			StartButton.label_update();
			ModeDiscription.update();
		});

		var ModeRightButton = make_Sprite(DIRECTION_SIZE, DIRECTION_SIZE, SCREEN_SIZE_X-DIRECTION_SIZE-40, STARTBUTTON_Y+DIRECTION_SIZE/2, 'img/direction.gif');
		ModeRightButton.rotation = 180;
		ModeRightButton.addEventListener('touchstart', function (e) {
			CourseIncrement();
			StartButton.label_update();
			ModeDiscription.update();
		});

	//*モード切替ボタン*
		var ModeSwitch = make_Sprite(DIRECTION_SIZE, DIRECTION_SIZE, SCREEN_SIZE_X/2+DIRECTION_SIZE+40, STARTBUTTON_Y-DIRECTION_SIZE/2-25, 'img/switch.gif');
		ModeSwitch.addEventListener('touchstart', function (e) {
			ModeSwitching();
			StartButton.label_update();
			ModeDiscription.update();
			ModeLabel.update();
		});

	//*モードラベル*
		var ModeLabel = make_Label(SCREEN_SIZE_X/2+DIRECTION_SIZE+85, STARTBUTTON_Y-DIRECTION_SIZE/2-17, "", "");
		ModeLabel.update = function(){
			this.text = "<div class='label'>" + GameSet[Mode][Course]["mode"] + "</div>";
		}
		ModeLabel.update();

	//*モード説明*
		var ModeDiscription = make_Label(0, STARTBUTTON_Y+70, "", "");
		ModeDiscription.update = function(){
			this.text = "<div id='discription'>" + GameSet[Mode][Course]["discription"] + "</div>";
		}
		ModeDiscription.update();

	//*操作説明ボタン*
		var HelpButton = new Label();
		HelpButton.x = SCREEN_SIZE_X-130;
		HelpButton.y = SCREEN_SIZE_Y-60;
		HelpButton.text = "<h1 id='helpbutton' class='button'>操作説明</h1>";
		HelpButton.addEventListener('touchstart', function (e) {
			//console.log('ヘルプ');
			var scale = $('#enchant-stage').find('div').css('-webkit-transform');
			$('#help').css({
				'display':'block',
				'-webkit-transform-origin':'0px 0px',
				'-webkit-transform':scale,
			});
			$('#help').animate(
				{'opacity':'1'},
				'fast'
			);
			$('#help').click(function(){
				$('#help').animate({opacity:0,},
					{duration:'fast',complete:
					function(){
						$('#help').css({'display':'none'});
					},
				});
			});
		});

	//*音ボタン*
		if(SoundFlag == 1){
			var sound_img = 'img/sound.gif';
		}else{
			var sound_img = 'img/sound_n.gif';
		}
		var SoundButton = make_Sprite(40, 40, SCREEN_SIZE_Y-50, 10, sound_img);
		SoundButton.addEventListener('touchstart', function (e) {
			SoundFlagSwitching();
			if(SoundFlag == 1){
				this.image = game.assets['img/sound.gif'];
			}else{
				this.image = game.assets['img/sound_n.gif'];
			}
		});

		SceneTitle.addEventListener('enterframe', function (e) {
			if(ModeLeftButton.scaleX > 1){
				ModeLeftButton.scaleX -= 0.15;
				ModeLeftButton.scaleY -= 0.15;
			}else{
				ModeLeftButton.scaleX = 1;
				ModeLeftButton.scaleY = 1;
			}

			if(ModeRightButton.scaleX > 1){
				ModeRightButton.scaleX -= 0.15;
				ModeRightButton.scaleY -= 0.15;
			}else{
				ModeRightButton.scaleX = 1;
				ModeRightButton.scaleY = 1;
			}

			if(ModeSwitch.scaleX > 1){
				ModeSwitch.scaleX -= 0.15;
				ModeSwitch.scaleY -= 0.15;
			}else{
				ModeSwitch.scaleX = 1;
				ModeSwitch.scaleY = 1;
			}

		});

		var CourseIncrement = function(){
			ModeRightButton.scaleX = 1.45;
			ModeRightButton.scaleY = 1.45;

			if(Mode == "COMMON"){
				if(CommonCourseIndex == CommonCourse.length-1){
					CommonCourseIndex = 0;
				}else{
					CommonCourseIndex++;
				}
				Course = CommonCourse[CommonCourseIndex];
			}else{
				if(ExtraCourseIndex == ExtraCourse.length-1){
					ExtraCourseIndex = 0;
				}else{
					ExtraCourseIndex++;
				}
				Course = ExtraCourse[ExtraCourseIndex];
			}
			MarkerPinUpdate();
		}
		var CourseDecrement = function(){
			ModeLeftButton.scaleX = 1.45;
			ModeLeftButton.scaleY = 1.45;

			if(Mode == "COMMON"){
				if(CommonCourseIndex == 0){
					CommonCourseIndex = CommonCourse.length-1;
				}else{
					CommonCourseIndex--;
				}
				Course = CommonCourse[CommonCourseIndex];
			}else{
				if(ExtraCourseIndex == 0){
					ExtraCourseIndex = ExtraCourse.length-1;
				}else{
					ExtraCourseIndex--;
				}
				Course = ExtraCourse[ExtraCourseIndex];
			}
			MarkerPinUpdate();
		}

		var ModeSwitching = function(){
			ModeSwitch.scaleX = 1.45;
			ModeSwitch.scaleY = 1.45;

			if(Mode == "COMMON"){
				Mode = "EXTRA";
				Course = ExtraCourse[ExtraCourseIndex];
				BackFrame.text = "<div class=\"backframe_ex\"></div>";
			}else{
				Mode = "COMMON";
				Course = CommonCourse[CommonCourseIndex];
				BackFrame.text = "<div class=\"backframe\"></div>";
			}
			MarkerPinUpdate();
		}

		var ModeMarkerPin = make_Label(0,297,"marker_pin","test");

		var MarkerPinUpdate = function(){
			var markerText = "";
			if(Mode == "COMMON"){
				for (var i = 0; i < CommonCourse.length; i++) {
					if(CommonCourseIndex == i){
						markerText = markerText + "●";
					}else{
						markerText = markerText + "・";
					}
				};
			}else{
				for (var i = 0; i < ExtraCourse.length; i++) {
					if(ExtraCourseIndex == i){
						markerText = markerText + "●";
					}else{
						markerText = markerText + "・";
					}
				};

			}

			ModeMarkerPin.text = "<div class=\"marker_pin\">" + markerText + "</div>";

		}

		MarkerPinUpdate();

		if(CommonCourse.length < 2){
			ModeMarkerPin.visible = false;
			ModeLeftButton.visible = false;
			ModeRightButton.visible = false;
		}

	//add
		SceneTitle.addChild(BackgroundTitle);
		SceneTitle.addChild(TitleLogo);
		SceneTitle.addChild(BackFrame);
		SceneTitle.addChild(ModeLabel);
		SceneTitle.addChild(StartButton);
		SceneTitle.addChild(ModeLeftButton);
		SceneTitle.addChild(ModeRightButton);
		SceneTitle.addChild(ModeSwitch);
		SceneTitle.addChild(ModeDiscription);
		SceneTitle.addChild(ModeMarkerPin);
		SceneTitle.addChild(HelpButton);
		SceneTitle.addChild(SoundButton);


//*********************
//バッティング画面
//*********************
	//*バッティングシーン*
		var SceneBatting = new Scene();
		//BGMループ用
		SceneBatting.bgm_fadeout = false;
		//フレーム更新処理
 		SceneBatting.addEventListener('enterframe', function(){
 			//BGM ループ再生
 			if(!SceneBatting.bgm_fadeout && SoundFlag == 1){
				game.assets[BattingBgmFile].play();
				game.assets[BattingBgmFile].volume = 0.4;
			}
		});

	//*背景*
		var BackgroundBatting = make_Sprite(GROUND_SIZE_X, GROUND_SIZE_Y, 0, -800, 'img/background_batting.jpg');
		BackgroundBatting.scale(2,2);

	//*バーチャルキーパッド*
		var KeyPad = new Pad();
		KeyPad.x = PAD_X;
		KeyPad.y = PAD_Y;

	//*スイングボタン*
		var SwingButton = make_Sprite(SWINGBUTTON_SIZE, SWINGBUTTON_SIZE, SWINGBUTTON_X, SWINGBUTTON_Y, 'img/swing_button.png');
		// タッチ開始時処理
		SwingButton.ontouchstart = function() {
			get_space();
        };
	
	//*残り球数*
		var LastBall = make_Label(LASTBALL_X, LASTBALL_Y, "", "");
		LastBall.num = BALL_NUM;
		LastBall.max = BALL_NUM;
		LastBall.battedball_num = 0; //打球の数
		LastBall._element.style.zIndex = 5;
		LastBall.update = function(){
			this.text = "<div class='statelabel'>残り<img src='img/ball_thum.gif'>×"+this.num+"</div>";
		}
		LastBall.decrement = function(){
			this.update();
			if(this.num == 0 && this.battedball_num == 0 && Pitcher.throw_flag == true && SceneBatting.bgm_fadeout == false){
				SceneBatting.bgm_fadeout = true;
				//console.log("ゲーム終了");
				setTimeout(function(){
					if(SoundFlag == 1){
						game.assets[RESULT_BGM].stop();
						game.assets[RESULT_BGM].play();
						game.assets[RESULT_BGM].volume = 0.4;
					}
					Point.visible = false;
					StateFrame.visible = false;
					LastBall.visible = false;
					//game.pushScene(SceneBatting);
					
					//------クッキー処理-----

					//--------------------
					game.pushScene(SceneResult);
				},3000);
			}
		}

	//*得点*
		var Point = make_Label(POINT_X, POINT_Y, "", "");
		Point.num = 0;
		Point.ball =  new Array(); //ボール別のスコア
		Point.miss = 0; //空振り率
		Point.max = 0; //最高飛距離
		Point.super_hit = 0; //真芯率
		Point._element.style.zIndex = 5;
		Point.update = function(){
			this.text = "<div class='statelabel'>合計"+this.num+"m</div>";
		}
		Point.update();
		Point.addition = function(point, hit_se){
			this.num += point;
			this.update();
			this.obj = new Object();
			this.obj['hit_se'] = hit_se;
			this.obj['score'] = point;
			this.ball.push(this.obj);

			//真芯カウントの追加
			if(hit_se == 'sound/hit_ex.wav'){
				this.super_hit++;
			}
			//飛距離0なら空振り
			if(point == 0){
				this.miss++;
			}
			//最高飛距離の更新
			if(this.max < point){
				this.max = point;
			}
		}
		Point.reset = function(){
			Point.num = 0;
			Point.ball =  null;
			Point.ball =  new Array(); //ボール別のスコア
			Point.miss = 0; //空振り率
			Point.max = 0; //最高飛距離
			Point.super_hit = 0; //真芯率
		}

	//*表示系枠*
		var StateFrame = make_Label(0, 0, "stateframe", "");
		StateFrame._element.style.zIndex = 5;
	
	//*表示系グループ*
		var States = new Group();
		States.x = STATES_X;
		States.y = STATES_Y;
		States.addChild(StateFrame);
		States.addChild(LastBall);
		States.addChild(Point);

	//*投球（ミートカーソルのあたり判定用にここで変数定義）*
		var Ball;

	//*ピッチャー*
		var Pitcher = make_Sprite(PITCHER_SIZE_X, PITCHER_SIZE_Y, PITCHER_X, PITCHER_Y, 'img/yuno.gif');
		Pitcher._element.style.zIndex = 2;
		//投げるflag
		Pitcher.throw_flag = true;
		//投球間隔カウント変数
		Pitcher.throw_interval_count = -30; //初回
		//アニメーションフレーム
		Pitcher.frame_num = 0;
		//投球関数（引数で投球コース、スピードとか
		Pitcher.throw_ball = function(template_num){
			Ball = make_Sprite(BALL_SIZE, BALL_SIZE, BALL_DEFAULT_X+BALL_SIZE/2, BALL_DEFAULT_Y, 'img/throw_ball.gif');
			Ball._element.style.zIndex = 4;
			Ball.frame_num = 0;
			LastBall.num--;
			LastBall.decrement();
			//球種の数値は基本的に モード数×100+通し番号 とする イージーの1番目なら101 
			switch(template_num){
				case 0:
					//テンプレート呼ばない場合（超ランダムとか用に用意しとく、使わないかも）
					break;

				case 1: //デバック用 固定球
					Ball.speed_x = 0;
					Ball.speed_y = 0;

					Ball.x = MeetCursor.x + MEETCURSOR_SIZE_X/2 - 7.5;
					Ball.y = MeetCursor.y + MEETCURSOR_SIZE_Y/2 - 7.5;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){

					});
					break;

				//イージー用球種
				case 101: //イージーモード用ストレート 左右に少し角度がつく
					Ball.direction_x = (Math.random() - Math.random()) * 0.6;//1:右、-1:左
					Ball.direction_y = 1;//1:前、-1:後
					Ball.speed_x = 1;
					Ball.speed_y = 9 + Math.random() * 3;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.x = this.x + this.direction_x*this.speed_x;
						this.y = this.y + this.direction_y*this.speed_y;
					});
					break;

				//ノーマル用球種
				case 201: //ノーマルモード用 ストレート 左右に少し角度がつく
					Ball.direction_x = (Math.random() - Math.random()) * 0.8;//1:右、-1:左
					Ball.direction_y = 1;//1:前、-1:後
					Ball.speed_x = 1;
					Ball.speed_y = 10 + Math.random() * 3;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.x = this.x + this.direction_x*this.speed_x;
						this.y = this.y + this.direction_y*this.speed_y;
					});
					break;

				case 202: //カーブとシンカー：弧を描く
					Ball.carve = Math.random() * 3 + 2;
					if(parseInt(Math.random()*10)%2 == 1){
						Ball.carve *= -1;
					}
					Ball.speed_x = 	Ball.carve;
					Ball.speed_y = 8 + Math.random() * 3;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.speed_x -=  Ball.carve/21;
						this.x = this.x + this.speed_x;
						this.y = this.y + this.speed_y;
					});
					break;

				case 203: //ナックル：ぶれて見切りづらいボール
					Ball.speed_x = (Math.random() - Math.random()) * 0.7;
					Ball.speed_y = 9 + Math.random() * 2;
					Ball.bure = 30;
					Ball.throw_frame = 0;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.throw_frame ++;
						if(Ball.throw_frame == 1){
							this.x += Ball.bure/2;
						}
						if(this.bure > 0){
							this.bure *= 0.9;
						}
						this.plus_x = this.bure;
						if(this.throw_frame %2 == 1){
							this.plus_x *= -1;
						}
						this.x = this.x + this.speed_x+this.plus_x;
						this.y = this.y + this.speed_y;
					});
					break;

				case 204: //スローボール
					Ball.speed_x = (Math.random() - Math.random()) * 0.8;
					Ball.speed_y = 5 + Math.random() * 3;
					Ball.buoyancy = -6;
					Ball.throw_frame = 0;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.throw_frame ++;
						Ball.buoyancy += 0.3
						this.x = this.x + this.speed_x;
						this.y = this.y + this.speed_y + Ball.buoyancy;
					});
					break;

				//ゆのさま用球種
				case 301: //ハードモード用 ストレート 左右に少し角度がつく
					Ball.direction_x = (Math.random() - Math.random());//1:右、-1:左
					Ball.direction_y = 1;//1:前、-1:後
					Ball.speed_x = 1;
					Ball.speed_y = 15 + Math.random() * 3;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.x = this.x + this.direction_x*this.speed_x;
						this.y = this.y + this.direction_y*this.speed_y;
					});
					break;

				case 302: //オウルボール
					Ball.speed_x = (Math.random() - Math.random()) * 0.3;
					Ball.speed_ex_x = 9;
					Ball.speed_y =5 + Math.random() * 3;
					Ball.throw_frame = 4;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.throw_frame ++;
						if(this.throw_frame % 8 == 0){
							Ball.speed_ex_x *= -1;
						}
						this.x = this.x + this.speed_x + this.speed_x + this.speed_ex_x;
						this.y = this.y + this.speed_y;
					});
					break;

				case 303: //チェンジアップ：スローボールの強化版

					Ball.speed_x = (Math.random() - Math.random()) * 0.8;
					Ball.speed_y = 5 + Math.random() * 3;
					Ball.buoyancy = -9;
					Ball.throw_frame = 0;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.throw_frame ++;
						Ball.buoyancy += 0.4
						this.x = this.x + this.speed_x;
						this.y = this.y + this.speed_y + Ball.buoyancy;
					});
					break;

				case 304: //超ナックル：着弾までブレるボール
					Ball.speed_x = (Math.random() - Math.random());
					Ball.speed_y = 10 + Math.random() * 5;
					Ball.bure = 50;
					Ball.throw_frame = 0;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.throw_frame ++;
						if(Ball.throw_frame == 1){
							this.x += Ball.bure/2;
						}
						if(this.bure > 0){
							this.bure *= 0.85;
						}
						this.plus_x = this.bure;
						if(this.throw_frame %2 == 1){
							this.plus_x *= -1;
						}
						this.x = this.x + this.speed_x+this.plus_x;
						this.y = this.y + this.speed_y;
					});
					break;

				case 305: //ティガーボール：消える魔球
					Ball.direction_x = (Math.random() - Math.random()) * 0.9;//1:右、-1:左
					Ball.direction_y = 1;//1:前、-1:後
					Ball.speed_x = 1;
					Ball.speed_y = 10 + Math.random() * 3;
					Ball.throw_frame = 0;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.x = this.x + this.direction_x*this.speed_x;
						this.y = this.y + this.direction_y*this.speed_y;
						
						if(this.y < Pitcher.y + 330){
							this.throw_frame++;
							switch(this.throw_frame%5){
								case 0:
									this.visible = false;
									break;
								case 1:
									this.visible = true;
									break;
							}
						}else if(this.y >= Pitcher.y + 330){
							this.visible = false;
						}
					});
					break;

				case 306: //超カーブ超シンカー：弧を描く
					Ball.carve = Math.random() * 2 + 13;
					if(parseInt(Math.random()*10)%2 == 1){
						Ball.carve *= -1;
					}
					Ball.speed_x = 	Ball.carve;
					Ball.speed_y = 14;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.speed_x -=  Ball.carve/12.5;
						this.x = this.x + this.speed_x;
						this.y = this.y + this.speed_y;
					});
					break;

				case 307: //ループシュート
					Ball.speed_x = (Math.random() - Math.random()) * 0.5;//1:右、-1:左
					Ball.speed_y = 1.9;
					Ball.roll_speed = 3;
					Ball.roll = 180;
					
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.roll_speed += 0.05;
						this.roll += 10;
						this.x += this.roll_speed * Math.cos((this.roll) * Math.PI/180);
						this.y += this.roll_speed * Math.sin((this.roll) * Math.PI/180);
						this.x = this.x + this.speed_x;
						this.y = this.y + this.speed_y;
					});
					break;

				case 308: //収縮ショット
					Ball.x -= 40;
					Ball.speed_x = (Math.random() - Math.random()) * 0.1;//1:右、-1:左
					Ball.speed_y = 4;
					Ball.roll_speed = 100;
					Ball.roll = 180;
					
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.roll_speed -= this.roll_speed/10;
						this.roll += 120 + this.roll_speed/2;
						if(this.roll_speed < 5){
							this.speed_y = 20;
							this.roll_speed = 0;
						}
						this.x += this.roll_speed * Math.cos((this.roll) * Math.PI/180);
						this.y += this.roll_speed * Math.sin((this.roll) * Math.PI/180);
						this.x = this.x + this.speed_x;
						this.y = this.y + this.speed_y;
					});
					break;

				//追加モードその1用球種
				case 401: //ストレート 左右に少し角度がつく
					Ball.direction_x = (Math.random() - Math.random()) * 1.1;//1:右、-1:左
					Ball.direction_y = 1;//1:前、-1:後
					Ball.speed_x = 1;
					Ball.speed_y = 12 + Math.random() * 6;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.x = this.x + this.direction_x*this.speed_x;
						this.y = this.y + this.direction_y*this.speed_y;
						
					});
					break;

				//ノックモードその2用球種
				case 501: //ストレート 左右に少し角度がつく
					Ball.direction_x = (Math.random() - Math.random()) * 1.0;//1:右、-1:左
					Ball.direction_y = 1;//1:前、-1:後
					Ball.speed_x = 1;
					Ball.speed_y = 13 + Math.random() * 2;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.x = this.x + this.direction_x*this.speed_x;
						this.y = this.y + this.direction_y*this.speed_y;
					});
					break;

				//ハード用球種
				case 601: //ノーマルモード用 ストレート 左右に少し角度がつく
					Ball.direction_x = (Math.random() - Math.random()) * 0.9;//1:右、-1:左
					Ball.direction_y = 1;//1:前、-1:後
					Ball.speed_x = 1;
					Ball.speed_y = 14 + Math.random() * 3;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.x = this.x + this.direction_x*this.speed_x;
						this.y = this.y + this.direction_y*this.speed_y;
					});
					break;

				case 602: //カーブとシンカー：弧を描く
					Ball.carve = Math.random() * 3 + 4;
					if(parseInt(Math.random()*10)%2 == 1){
						Ball.carve *= -1;
					}
					Ball.speed_x = 	Ball.carve;
					Ball.speed_y = 11 + Math.random() * 2;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.speed_x -=  Ball.carve/16;
						this.x = this.x + this.speed_x;
						this.y = this.y + this.speed_y;
					});
					break;

				case 603: //ナックル：ぶれて見切りづらいボール
					Ball.speed_x = (Math.random() - Math.random()) * 0.85;
					Ball.speed_y = 11 + Math.random() * 2;
					Ball.bure = 30;
					Ball.throw_frame = 0;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.throw_frame ++;
						if(Ball.throw_frame == 1){
							this.x += Ball.bure/2;
						}
						if(this.bure > 0){
							this.bure *= 0.85;
						}
						this.plus_x = this.bure;
						if(this.throw_frame %2 == 1){
							this.plus_x *= -1;
						}
						this.x = this.x + this.speed_x+this.plus_x;
						this.y = this.y + this.speed_y;
					});
					break;

				case 604: //スローボール
					Ball.speed_x = (Math.random() - Math.random()) * 0.8;
					Ball.speed_y = 5 + Math.random() * 3;
					Ball.buoyancy = -6;
					Ball.throw_frame = 0;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.throw_frame ++;
						Ball.buoyancy += 0.35;
						this.x = this.x + this.speed_x;
						this.y = this.y + this.speed_y + Ball.buoyancy;
					});
					break;
			}

			//空振り処理
			Ball.addEventListener('enterframe', function(){
				if ( this.y >= GROUND_SIZE_Y ) {
					Camera.removeChild(this);
					Pitcher.throw_flag = true;
					LastBall.decrement();
					Point.addition(0, -1); //空振りスコアの追加
					Ball.clearEventListener();//一応
				}else{
					Ball.frame_num++;
					if(Ball.frame_num > 6){
						Ball.frame_num = 0;
					}
					Ball.frame = Ball.frame_num;
				}
			});
			//console.log('throw')
			Camera.addChild(Ball);
		};
		//フレーム処理
		Pitcher.addEventListener('enterframe', function(){
			if(Camera.timestart){
				if(this.throw_flag == true){
					//投球
					if((this.frame_num == 9) && (this.throw_interval_count == PITCH_INTERVAL)){
						this.throw_flag = false;
						this.throw_interval_count = 0;
						//球種を選定する
						//ストレートを設定
						this.ball_type = GameSet[Mode][Course]["type_of_pitch"]*100 + 1;
						if(GameSet[Mode][Course]["type_of_pitch"] == 1){//イージーモード
						
						}else if(GameSet[Mode][Course]["type_of_pitch"] == 2){//ノーマルモード
							//残り球数が奇数の時に変化球を混ぜる
							if(LastBall.num %2 == 1){
								this.ball_type += 1 +  parseInt(Math.random()*10%3);
							}
						}else if(GameSet[Mode][Course]["type_of_pitch"] == 3){//ゆのさまモード
							//常に変化球も投げる
							this.ball_type += parseInt(Math.random()*10%8);
						}else if(GameSet[Mode][Course]["type_of_pitch"] == 6){
							//残り球数が奇数の時に変化球を混ぜる
							if(LastBall.num %2 == 1){
								this.ball_type += 1 +  parseInt(Math.random()*10%3);
							}
						}else if(GameSet[Mode][Course]["type_of_pitch"] == 7){
							if(LastBall.num > 8){
								this.ball_type = 202; 		
							}else if(LastBall.num == 8){
								this.ball_type = 204;
							}else if(LastBall.num > 5){
								this.ball_type = 602;
							}else if(LastBall.num == 5){
								this.ball_type = 604;
							}else if(LastBall.num == 4){
								this.ball_type = 303;
							}else{
								this.ball_type = 306;
							}


						}
						//投球
						//console.log('ball_type:' + this.ball_type);
						this.throw_ball(this.ball_type);
					}
					//投球モーション
					else if(this.throw_interval_count >= PITCH_INTERVAL){
						if(game.frame % (game.fps/10) == 0){
							this.frame_num++;
						}
					}
					//インターバルカウント
					else if ((this.frame_num < 9) && (LastBall.num > 0)) {
						this.throw_interval_count++;
						if(GameSet[Mode][Course]["nock"] == 1 && LastBall.num != LastBall.max){
							this.throw_interval_count = PITCH_INTERVAL;
						}
					}
					//セットモーション
					else if((this.frame_num >= 9) && (this.throw_interval_count == 0)){
						if(GameSet[Mode][Course]["nock"] == 1 && LastBall.num > 0){
							this.frame_num = 3;
						}
						if(game.frame % (game.fps/10) == 0){
							if(this.frame_num == 11){
								this.frame_num = 0;
							}else{
								this.frame_num++;
							}
						}
					}
				}
			}
			this.frame = this.frame_num;
		});

	//*バット*
		var Bat = make_Sprite(96, 32, BATTER_DEFAULT_X+BATTER_SIZE_X/2+10, BATTER_DEFAULT_Y+BATTER_SIZE_Y/2, 'img/bat.gif');
		Bat.swing_frame = 0; //スイングした時のフレームカウント
		Bat._element.style.zIndex = 3;
		Bat.rotation = 0;
		Bat.addEventListener('enterframe', function(){
			if(Camera.timestart){
				Bat.swing_frame++;
				if(Batter.swing_flag == false){	
					if(this.swing_frame==1){ //宮子中割の設定とバットの初期化
						Bat.x = -9999; //再表示で不自然にならないように退ける
						Bat.rotation = 33;
						Batter.frame = 2; //振る前の中割を設定
					}else if(this.swing_frame < 6){
						Batter.frame = 3; //振るアニメ
						Bat.rotation -= 15; 
						//回転と位置が同期するように差分を取る
						Bat.distance_x = -48 * Math.cos((Bat.rotation + 180) * Math.PI/180);
						Bat.distance_y = -48 * Math.sin((Bat.rotation + 180) * Math.PI/180);
						//差分を利用してバッターの腕にくっつける
						Bat.x = Batter.x + Bat.distance_x + 22;
						Bat.y = Batter.y + BATTER_SIZE_Y/2 + Bat.distance_y + 2;
					}else if(this.swing_frame == 6){
						Batter.frame = 4; //振るアニメ
						Bat.x = -9999; //表示が不自然にならないように退ける
					}else if(this.swing_frame == 7){
						Batter.frame = 5; //振るアニメ
					}else if(this.swing_frame == 8){
						Batter.frame = 6; //振るアニメ
					}else if(this.swing_frame == 14){
						Batter.frame = 5; //振るアニメ
					}
					//投球されている場合振り切ったままになるように制御
					if(Pitcher.throw_flag == false && this.swing_frame > 10 && GameSet[Mode][Course]["nock"] == 0){
						this.swing_frame = 10;
					}
					if(this.swing_frame >= 15){
						Camera.removeChild(Bat);
						Bat.swing_frame= 0; //フレームカウントリセット
						Batter.swing_flag = true;	
						Batter.frame = 1; //振るアニメ
					}
				}
			}
		});
 
	//*バッター*
		var Batter = make_Sprite(BATTER_SIZE_X, BATTER_SIZE_Y, BATTER_DEFAULT_X, BATTER_DEFAULT_Y, 'img/miyako.gif');
		Batter.frame = 0;
		Batter.swing_flag = true;
		Batter._element.style.zIndex = 3;
		//スイング（スペース押したときの）処理
		Batter.swing = function(){
			//console.log('swing'); //for debug
			this.swing_flag = false;	
			Camera.addChild(Bat);
		}
		//フレーム処理
		Batter.addEventListener('enterframe', function(){
			if(Camera.timestart){
				//構えモーション
				if(this.swing_flag == true ){
					if(Pitcher.throw_flag == false){
						if(this.frame == 0){
							this.frame = 1;
						}
					}else if(Pitcher.throw_flag == true){
						if(this.frame == 1){
							this.frame = 0;
						}
					}
				}
				//移動
				if(this.swing_flag == true || Bat.swing_frame < 4){
					if(game.input.up && Batter.y > BATTER_DEFAULT_Y-BATTER_LIMIT_Y){
						Batter.y = Batter.y - 3;
					}else if(game.input.down && Batter.y < BATTER_DEFAULT_Y+BATTER_LIMIT_Y){
						Batter.y = Batter.y + 3;
					}
					if(game.input.left && Batter.x > BATTER_DEFAULT_X-BATTER_LIMIT_X){
						Batter.x = Batter.x - 2;
					}else if(game.input.right && Batter.x < BATTER_DEFAULT_X+BATTER_LIMIT_X){
						Batter.x = Batter.x + 2;
					}
				}
			}
		});

	//*ミートカーソル*
		var MeetCursor = make_Sprite(MEETCURSOR_SIZE_X, MEETCURSOR_SIZE_Y, MEETCURSOR_DEFAULT_X, MEETCURSOR_DEFAULT_Y, 'img/meetcursor.png');
		//ヒットフラグ
		MeetCursor.hit_flag = false;
		//芯からずれた際の減少補正
		MeetCursor.distance_powerfilter = 1.0;
		//フレーム処理
		MeetCursor.addEventListener('enterframe', function(){
			if(Camera.timestart){
				if(Pitcher.throw_flag == false){
					if(MeetCursor.intersect(Ball) && Bat.swing_frame == 3){
						LastBall.battedball_num++;
						Camera.removeChild(Ball);
						//console.log('ヒット'); //for debag
						MeetCursor.hit_flag = false;
						//打球角度
						var angle = 90 - ((Ball.y + BALL_SIZE/2) - (MeetCursor.y + MEETCURSOR_SIZE_Y/2)) * 2.5 * -1;
						//console.log('angle:'+angle);//for debug
						//ミートカーソルとボールの距離計算
						var distance = Math.sqrt(Math.pow((Ball.x + BALL_SIZE/2) - (MeetCursor.x + MEETCURSOR_SIZE_X/2), 2) + Math.pow((Ball.y + BALL_SIZE/2) - (MeetCursor.y + MEETCURSOR_SIZE_Y/2), 2) * 0.6);
						//console.log('distance:'+distance);//for debug
						//真芯値
						var meetpoint = 32;
						//打球スピード
						var batted_speed = (meetpoint - (distance * this.distance_powerfilter))* 0.7;
						Effect.add(2, Ball.x ,  Ball.y); //ヒットエフェクト
						//真芯演出
						if(batted_speed > 19.5){
							Camera.timestop = 10;
							//console.log(CAMERA_BATTING_X);
							Effect.add(1, - Camera.x ,  - Camera.y); //集中線エフェクト
						}

						if(batted_speed < 3){
							batted_speed = 3;
						}
							
						var hit_se ='';
						//var hit_se = 0;
						if(batted_speed > 19.5){
							play_se('sound/hit_ex.wav');
							hit_se = 'sound/hit_ex.wav';
						}else if(batted_speed>14){
							play_se('sound/hit_1.wav');
							hit_se = 'sound/hit_1.wav';
						}else if(batted_speed > 10){
							play_se('sound/hit_2.wav');
							hit_se = 'sound/hit_2.wav';
						}else if(batted_speed > 6){
							play_se('sound/hit_3.wav');
							hit_se = 'sound/hit_3.wav';
						}else if(batted_speed > 0){
							play_se('sound/hit_4.wav');
							hit_se = 'sound/hit_4.wav';
						}
						//console.log('batted_speed:'+batted_speed);//for debug
					//*打球*
						var BattedBall = make_Sprite(BALL_SIZE, BALL_SIZE, Ball.x, Ball.y, 'img/ball_shadow.gif');
						BattedBall.timespeed =1.7;
						BattedBall.speed_x = batted_speed * Math.cos(angle * Math.PI/180);
						BattedBall.speed_y = batted_speed * Math.sin(angle * Math.PI/180);
						//打球の地面からの高さ
						BattedBall.h = 10;
						//打球が着地したらtrue
						BattedBall.stop_flag = false;
						//浮力
						BattedBall.buoyancy = 2  + batted_speed * 0.25 - (Math.sqrt(Math.pow((Ball.y + BALL_SIZE/2) - (MeetCursor.y + MEETCURSOR_SIZE_Y/2), 2)))/6;
						if(BattedBall.buoyancy < 0.5){
							BattedBall.buoyancy = 0.5;
						}
						//console.log('tate:'+(Math.sqrt(Math.pow((Ball.y + BALL_SIZE/2) - (MeetCursor.y + MEETCURSOR_SIZE_Y/2), 2)))/3);
						//console.log('buoyancy:'+BattedBall.buoyancy);
						//飛距離（得点）
						BattedBall.flown = 0;
						//フレーム処理
						BattedBall.addEventListener('enterframe', function(){
							if(Camera.timestart){
								this.x = this.x - this.speed_x * this.timespeed;
								this.y = this.y - this.speed_y * this.timespeed;
								this.h =  this.h + this.buoyancy * this.timespeed;

								this.scaleX = 1 - this.h/600;
								this.scaleY = 1 - this.h/600;

								if(batted_speed > 0){
									this.buoyancy -= 0.1 * this.timespeed;
								}
								if(this.stop_flag == false){
									if(this.h <= 0){
										//console.log('落下');
										BattedBall._element.style.zIndex = 1;
										BattedBallHop._element.style.zIndex = 1;
										this.stop_flag = true;

										LastBall.battedball_num--;

										//console.log('hit_se:'+hit_se);
										Point.addition(parseInt(BattedBall.flown), hit_se); 
										Point.update();
									
										setTimeout(function(){
											Camera.removeChild(this);

											if(GameSet[Mode][Course]["nock"] == 0){
												Pitcher.throw_flag = true;
											}
											if(LastBall.num > 0){
												Camera.speed = 12;
												Camera.target_x = CAMERA_BATTING_X;
												Camera.target_y = CAMERA_BATTING_Y;
											}
											//Camera.removeChild(BattedBall);
											LastBall.decrement();
										},2000);
									}else{
										//飛距離でスコア計算されるように修正
										this.flown += batted_speed * 0.05 * this.timespeed;
									}
									//カメラ追従
									if(GameSet[Mode][Course]["nock"] == 0 && this.y >= CAMERA_BATTING_Y && Camera.timestop == 0){
										Camera.speed = 2;
										//グラウンド最下部からある程度離れたらカメラ追従
										if(this.y <= GROUND_SIZE_Y - 150){
											Camera.target_x = Camera.target_x + this.speed_x * this.timespeed;
											Camera.target_y = Camera.target_y + this.speed_y * this.timespeed;							}
										}
								}
								if(this.h <= 0 && this.buoyancy <= 0){
									this.buoyancy *= -0.4;
									if(parseInt(this.bouyancy) > -1){
										this.bouyancy =0;
									}
									this.h = 0;
									batted_speed *= 0.5;
									
									if(batted_speed < 0.5){
										batted_speed = 0;
										this.buoyancy = 0;
									}
									
									BattedBall.speed_x = batted_speed * Math.cos(angle * Math.PI/180);
									BattedBall.speed_y = batted_speed * Math.sin(angle * Math.PI/180);
								}
							}

							if(LastBall.num == LastBall.max){
								Camera.removeChild(this);
							}
						});
						var BattedBallHop = make_Sprite(BALL_SIZE*2, BALL_SIZE*2, Ball.x-BALL_SIZE/2,	Ball.y-BALL_SIZE/2, 'img/ball.gif');
						BattedBallHop.scaleX = 0.5 + BattedBall.h/400;
						BattedBallHop.scaleY = 0.5 + BattedBall.h/400;
						BattedBallHop.anime_frame = 0;
						BattedBallHop.anime_speed = 0;
						BattedBallHop.frame_num = Ball.frame_num;
						BattedBallHop.addEventListener('enterframe', function(){
							if(Camera.timestart && batted_speed > 0){
								BattedBallHop.x = parseInt(BattedBall.x  - BattedBall.speed_x * BattedBall.timespeed)  - BALL_SIZE/2;
								BattedBallHop.y = parseInt(BattedBall.y -BattedBall.speed_y * BattedBall.timespeed - BattedBall.h - BALL_SIZE + 5 );
								BattedBallHop.scaleX = 0.5 + BattedBall.h/400;
								BattedBallHop.scaleY = 0.5 + BattedBall.h/400;
								if(LastBall.num == LastBall.max){
									Camera.removeChild(this);
								}
								//ボールのアニメのはやさ
								this.anime_speed = 7 - batted_speed/2;
								if(this.anime_speed < 0){
									this.anime_speed = 0;
								}
								this.anime_frame++;
								if(this.anime_frame > this.anime_speed && batted_speed > 0.5){
									this.frame_num--;
									this.anime_frame = 0;
									if(this.frame_num < 0){
										this.frame_num = 6;
									}
									this.frame = this.frame_num;
								}
							}

						});


					//*飛距離表示*
						if(GameSet[Mode][Course]["nock"] == 0){
							var BallNowPointBar = new Sprite(SCREEN_SIZE_Y, 60);
							BallNowPointBar.x = 0;
							BallNowPointBar.y = 320;
							BallNowPointBar.opacity = 0;
							BallNowPointBar.backgroundColor = "white";
							BallNowPointBar._element.style.zIndex = 5;
							BallNowPointBar.end_frame = -3;

							var BallNowPointText = make_Label(0, 320, "", "");
							BallNowPointText._element.style.zIndex = 5;
							BallNowPointText.opacity = 0;

							BallNowPointBar.addEventListener('enterframe', function(){
								if(Camera.timestart){
									if(BattedBall.stop_flag){
										BallNowPointText.text = "<div id='now_point_end'>飛距離" + parseInt(BattedBall.flown) + "ｍ</div>";
										this.end_frame++;

										if(this.end_frame < 10){
											if(this.end_frame%2 ==0){
												BallNowPointText.visible = false;
											}else{
												BallNowPointText.visible = true;
											}
										}else{
											BallNowPointText.visible = true;
										}

									}else{
										BallNowPointText.text = "<div id='now_point'>飛距離" + parseInt(BattedBall.flown) + "ｍ</div>";
										if(this.opacity < 0.7 && this.end_frame == 0){
											this.opacity += 0.1;
											BallNowPointText.opacity += 0.1;
										}
										if(this.end_frame < 0){
											this.end_frame++;
										}
									}

									if(this.end_frame > 60){
										if(this.opacity > 0){
											this.opacity -= 0.05;
											BallNowPointText.opacity -= 0.05;
										}else{
											SceneBatting.removeChild(this);
											SceneBatting.removeChild(BallNowPointText);							
										}

									}
								}
							});
							SceneBatting.addChild(BallNowPointBar);
							SceneBatting.addChild(BallNowPointText);
						}
						Camera.addChild(BattedBall);
						Camera.addChild(BattedBallHop);

						BattedBall._element.style.zIndex = 2;
						BattedBallHop._element.style.zIndex = 2;
						if(GameSet[Mode][Course]["nock"] == 1){
							Pitcher.throw_flag = true;
						}
					}
				}
				//移動 バッターの位置についていく
				MeetCursor.x = Batter.x + 110;
				MeetCursor.y = Batter.y + 60;
			}
		});
		
	//*エフェクト*
		var Effect = new Group();
		Effect.add = function(effect_num, input_x , input_y){
			var EffectChild = new Sprite(0, 0);
			EffectChild.x = input_x;
			EffectChild.y = input_y;
			EffectChild.animation_frame = 0;
			Effect.addChild(EffectChild);
			switch(effect_num){
				//集中線
				case 1:
					EffectChild.width = 480;
					EffectChild.height = 480;
					EffectChild.image = game.assets['img/effect_line.gif'];
					EffectChild.addEventListener('enterframe', function(){
						this.x = - Camera.x;
						this.y = - Camera.y;

						this.animation_frame++;
						if(this.animation_frame%2 == 1){
							this.visible = true;
						}else{
							this.visible = false;
						}
						if(this.animation_frame > 3){
							Effect.removeChild(this);
						}
					});					
					break;

				//ヒットエフェクト
				case 2:
					EffectChild.width = 15;
					EffectChild.height = 15;
					EffectChild.image = game.assets['img/effect_hit.gif'];
					EffectChild.addEventListener('enterframe', function(){

						this.animation_frame++;
						if(this.opacity > 0){
							this.opacity -= 0.15;
						}
						if(this.animation_frame > 8){
							Effect.removeChild(this);
						}
					});					
					break;
				}
		}

	//*カメラ*
		var Camera = new Group();
		Camera.x = CAMERA_BATTING_X;
		Camera.y = CAMERA_BATTING_Y + 2000; //2000:カメラ初期位置
		Camera.target_x = CAMERA_BATTING_X; //カメラが向かう位置
		Camera.target_y = CAMERA_BATTING_Y; //カメラが向かう位置
		Camera.speed = 10; //目的に対する追従速度
		Camera.timestop = 0; //時を止めるフレーム
		Camera.timestart = true;
		Camera.frame_test= 0;
		Camera.reset = function(){
			SceneBatting.bgm_fadeout = false;
			game.assets[BattingBgmFile].volume = 0.4;
			Camera.speed = 10;
			Camera.target_x = CAMERA_BATTING_X;
			Camera.target_y = CAMERA_BATTING_Y;
		}
		Camera.addEventListener('enterframe', function(){	
			if(this.timestop > 0){
				this.timestop--;
				this.timestart = false;
			}else{
				this.timestart = true;
			}

			if(this.timestart){
				this.x = parseInt(this.x - (this.x - this.target_x)/this.speed);
				this.y = parseInt(this.y -(this.y - this.target_y)/this.speed);

				if(this.x >  this.target_x){
					Camera.x--;
				}else if(this.x <  this.target_x){
					this.x++;
				}

				if(this.y >  this.target_y){
					this.y--;
				}else if(this.y <  this.target_y){
					this.y++;
				}

			}

			if(SceneBatting.bgm_fadeout&& game.assets[BattingBgmFile].volume > 0){
				game.assets[BattingBgmFile].volume -= 0.005;
				if(game.assets[BattingBgmFile].volume < 0.01){
					game.assets[BattingBgmFile].volume = 0;
					game.assets[BattingBgmFile].stop();
				}
			}
		});
		//カメラグループへのadd
		Camera.addChild(BackgroundBatting);
		Camera.addChild(MeetCursor);
		Camera.addChild(Pitcher);
		Camera.addChild(Batter);
		Camera.addChild(Effect);

	//add
		SceneBatting.addChild(Camera);
		SceneBatting.addChild(States);
		SceneBatting.addChild(KeyPad);
		SceneBatting.addChild(SwingButton);
	
//******************
//リザルト画面
//****************
	//*リザルトシーン*
		var SceneResult = new Scene();
		SceneResult.animation_frame = 0;
		SceneResult.score_ball_num = 1;
		//リトライ=1, リセット=2
		SceneResult.select_menu = 0;
		SceneResult.addEventListener('leftbuttondown', function(){
			SceneResult.select_menu = 1;
			RetryButton.opacity = 0.8;
			ResetButton.opacity = 0.3;
		});
		SceneResult.addEventListener('rightbuttondown', function(){
			SceneResult.select_menu = 2;
			ResetButton.opacity = 0.8;
			RetryButton.opacity = 0.3;
		});
		//スペースを押したとき
		SceneResult.decide = function(){
			if(this.select_menu == 1){
				SceneResult.select_menu = 0;
				SceneResult.animation_frame = 0;
				SceneResult.score_ball_num = 1;
				BackgroundResult.opacity = 0;
				Pitcher.throw_interval_count = -30; //初回
				if(SoundFlag == 1){
					game.assets[RESULT_BGM].stop();
					game.assets[RESULT_BGM].volume = 0;
					game.assets[BattingBgmFile].stop();
				}
				game.popScene(SceneResult);
				//game.popScene(SceneBatting);
				
				StartButton.game_start();
				Point.reset();
				Camera.reset();
				Point.update();
				//game.pushScene(SceneBatting);

				for (var i =SceneResult.childNodes.length-1; i>=0; i--) {
					SceneResult.removeChild(SceneResult.childNodes[i]);
				}

				SceneResult.addChild(BackgroundResult);
				SceneResult.addChild(ResultTitle);
				SceneResult.addChild(ModeTitle);
				SceneResult.addChild(RetryButton);
				SceneResult.addChild(ResetButton);
				
				game.pushScene(SceneBatting);

				Point.visible = true;
				StateFrame.visible = true;
				LastBall.visible = true;
			}
			if(this.select_menu == 2){
				window.location.reload();
			}
		}

		SceneResult.addEventListener('enterframe', function(){
			this.animation_frame++;
			if(BackgroundResult.opacity < 0.7){
				BackgroundResult.opacity += 0.03;
			}
			if(this.animation_frame == 1){
				ResultTitle.opacity = 0;
				ModeTitle.opacity = 0;
			}
			if(this.animation_frame == 10){
				ResultTitle.text = "<div id=\"result_title\">結果発表</div>";
				ModeTitle.text = "<div id=\"mode_title\">" + GameSet[Mode][Course]["course_name"] + "</div>";
			}
			if(ResultTitle.opacity < 1){
				ResultTitle.opacity += 0.05;
			}

			if(ModeTitle.opacity < 1){
				ModeTitle.opacity += 0.05;
			}
			//100本モードとそれ以外のモードで結果表示を変化
			if(GameSet[Mode][Course]["nock"] == 1){
				if(this.animation_frame == 50){
					var MaxFlownHead = make_Label(120, 80, "result_type", "最高飛距離");
					SceneResult.addChild(MaxFlownHead);

					var MaxFlown = make_Label(240, 80, "result_score", Point.max+"m");
					SceneResult.addChild(MaxFlown);

					play_se('sound/hit_1.wav');
				}

				if(this.animation_frame == 70){
					var SpuerHitHead = make_Label(120, 135, "result_type", "真芯ヒット数");
					SceneResult.addChild(SpuerHitHead);

					var SpuerHitNum = make_Label(240, 135, "result_score", Point.super_hit+"回");
					SceneResult.addChild(SpuerHitNum);

					play_se('sound/hit_1.wav');
				}

				if(this.animation_frame == 90){
					var WhiffNumHead = make_Label(120, 190, "result_type", "空振り数");
					SceneResult.addChild(WhiffNumHead);

					var WhiffNum = make_Label(240, 190, "result_score", Point.miss+"回");
					SceneResult.addChild(WhiffNum);

					play_se('sound/hit_1.wav');
				}

				if(this.animation_frame == 110){
					var TotalMeter = make_Label(120, 240, "result_total", "合計"+Point.num+"m");
					SceneResult.addChild(TotalMeter);

					play_se('sound/hit_1.wav');
				}
			}else{
				if(this.animation_frame > 50){
					if(this.animation_frame %10 == 0 && this.score_ball_num <= LastBall.max){
						//x球目
						var BallNum = make_Label(100, 60+this.score_ball_num*20, "result_num", this.score_ball_num+"球目");
						SceneResult.addChild(BallNum);
						//xメートル
						var Meter = make_Label(220, 60+this.score_ball_num*20, "result_score", Point.ball[this.score_ball_num-1]['score']+"m");
						SceneResult.addChild(Meter);
						//空振りでなければヒット音を鳴らす
						if(Point.ball[this.score_ball_num-1]['hit_se'] != -1){
							play_se(Point.ball[this.score_ball_num-1]['hit_se']);						
						}
						this.score_ball_num++;
					}
				}
				if(this.animation_frame == 60 + LastBall.max *10){
						var TotalMeter = make_Label(120, 70+this.score_ball_num*20, "result_total", "合計"+Point.num+"m");
						SceneResult.addChild(TotalMeter);

						play_se('sound/hit_1.wav');
				}
			}
		});


	//*背景*
		var BackgroundResult = new Sprite(SCREEN_SIZE_X, SCREEN_SIZE_Y);
		BackgroundResult.opacity = 0;
		BackgroundResult.backgroundColor = "black";

	//*得点*
		var ResultTitle = make_Label(176, 10, "", "");
		ResultTitle.opacity = 0;
		ResultTitle.text = "";

	//*モード表示*
		var ModeTitle = make_Label(0, 52, "", "");
		ModeTitle.opacity = 0;
		ModeTitle.text = "";

	//*リトライボタン
		var RetryButton = make_Label(100, 400, "result_button", "もう一度");
		RetryButton.opacity = 0.3;
		RetryButton.addEventListener('touchstart', function (e) {
			SceneResult.select_menu = 1;
			RetryButton.opacity = 0.8;
			SceneResult.decide();
		});

	//*リセットボタン*
		var ResetButton = make_Label(260, 400, "result_button", "メニューへ");
		ResetButton.opacity = 0.3;
		ResetButton.addEventListener('touchstart', function (e) {
			SceneResult.select_menu = 2;
			ResetButton.opacity = 0.8;
			SceneResult.decide();
		});

	//add
		SceneResult.addChild(BackgroundResult);
		SceneResult.addChild(ResultTitle);
		SceneResult.addChild(ModeTitle);
		SceneResult.addChild(RetryButton);
		SceneResult.addChild(ResetButton);

//##########
//ゲーム管理
//##########
		game.addEventListener('spacebuttondown', get_space);
		game.pushScene(SceneTitle);
	};
	game.start();
};
