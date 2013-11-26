enchant();

window.onload = function hidamari_swing() {
	var game = new Game(480, 480);
	game.keybind(32, "space");  // spaceキー
	game.preload(
		//Background
		'img/background_title.jpg', 'img/background_batting.jpg',
		//title chara
		'img/logo.png', 'img/direction.gif', 'img/switch.gif', 'img/sound.gif', 'img/sound_n.gif',
		'img/trophy_direction.gif','img/realsize.gif','img/window_full.png','img/window_x1.png','img/window_x1.5.png',
		//batting chara
		'img/yuno.gif', 'img/bat.gif', 'img/miyako.gif', 'img/meetcursor.png',
		'img/ball.gif', 'img/throw_ball.gif', 'img/ball_shadow.gif',
		'img/swing_button.png',
		'img/effect_line.gif', 'img/effect_hit.gif',
		//BGM
		'sound/bgm_title.mp3','sound/bgm_easy.mp3', 'sound/bgm_normal.mp3',
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
	var TITLE_BGM = 'sound/bgm_title.mp3';
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
				"course_e" : "EASY",
				"mode" : "通常モード",
				"course_name" : "ほのぼのコース",
				"type_of_pitch" : 1,
				"nock" : 0,
				"ball_number" : 5,
				"powerfilter": 0.85,
				"bgm" : 'sound/bgm_easy.mp3',
				"discription" : "5球 / ノルマ:250m<br>ボールを打ち返してみよう！",
				"norma_rank_first": 250,
				"norma_rank_second": 400,
				"norma_rank_third": 500
			},
			"NORMAL" : {
				"course_e" : "NORMAL",
				"mode" : "通常モード",
				"course_name" : "わくわくコース",
				"type_of_pitch" : 2,
				"nock" : 0,
				"powerfilter": 0.9,
				"ball_number" : 10,
				"bgm" : 'sound/bgm_normal.mp3',
				"discription" : "10球 / ノルマ:500m<br>変化球も投げてくる！",
				"norma_rank_first": 500,
				"norma_rank_second": 800,
				"norma_rank_third": 1000
			},
			"HARD" : {
				"course_e" : "HARD",
				"mode" : "通常モード",
				"course_name" : "どきどきコース",
				"type_of_pitch" : 6,
				"nock" : 0,
				"powerfilter": 1.0,
				"ball_number" : 10,
				"bgm" : 'sound/bgm_hard.mp3',
				"discription" : "10球 / ノルマ:500m<br>上手い人向けの難しめコース！",
				"norma_rank_first": 500,
				"norma_rank_second": 800,
				"norma_rank_third": 1000
			},
			"STRAIGHT" : {
				"course_e" : "STRAIGHT",
				"mode" : "通常モード",
				"course_name" : "まっすぐコース",
				"type_of_pitch" : 4,
				"nock" : 0,
				"powerfilter": 0.9,
				"ball_number" : 10,
				"bgm" : 'sound/bgm_extra1.mp3',
				"discription" : "10球 / ノルマ:500m<br>直球のみで真剣勝負！",
				"norma_rank_first": 500,
				"norma_rank_second": 800,
				"norma_rank_third": 1000
			},
			"KIRE" : {
				"course_e" : "KIRE",
				"mode" : "通常モード",
				"course_name" : "きれきれコース",
				"type_of_pitch" : 7,
				"nock" : 0,
				"powerfilter": 0.75,
				"ball_number" : 10,
				"bgm" : 'sound/bgm_extra1.mp3',
				"discription" : "10球 / ノルマ:500m<br>だんだん難しくなる変化球コース！",
				"norma_rank_first": 500,
				"norma_rank_second": 800,
				"norma_rank_third": 1000
			}
		},
		"EXTRA" : {
			"YUNO" : {
				"course_e" : "YUNO",
				"mode" : "おまけモード",
				"course_name" : "ゆのさま",
				"type_of_pitch" : 3,
				"nock" : 0,
				"ball_number" : 10,
				"powerfilter": 0.85,
				"bgm" : 'sound/bgm_easy.mp3',
				"discription" : "10球 / ノルマ:400m<br>森で修行して帰ってきた！",
				"norma_rank_first": 400,
				"norma_rank_second": 600,
				"norma_rank_third": 800
			},
			"KNOCK" : {
				"course_e" : "KNOCK",
				"mode" : "おまけモード",
				"course_name" : "100本ノック",
				"type_of_pitch" : 5,
				"nock" : 1,
				"powerfilter": 1.0,
				"ball_number" : 100,
				"bgm" : 'sound/bgm_extra2.mp3',
				"discription" : "100球 / ノルマ:3000m<br>これはノックと呼べるのか！？とにかく打ちまくれ！",
				"norma_rank_first": 3000,
				"norma_rank_second": 5000,
				"norma_rank_third": 8000
			},
			"KNOCK_HARD" : {
				"course_e" : "KNOCK_HARD",
				"mode" : "おまけモード",
				"course_name" : "どきどきノック",
				"type_of_pitch" : 6,
				"nock" : 1,
				"powerfilter": 0.9,
				"ball_number" : 100,
				"bgm" : 'sound/bgm_extra2.mp3',
				"discription" : "100球 / ノルマ:3000m<br>てごわいぞ",
				"norma_rank_first": 3000,
				"norma_rank_second": 5000,
				"norma_rank_third": 8000
			},
			"EASY_EX" : {
				"course_e" : "EASY_EX",
				"mode" : "おまけモード",
				"course_name" : "ほのぼのコース×SP",
				"type_of_pitch" : 1,
				"nock" : 0,
				"ball_number" : 5,
				"powerfilter": 1.2,
				"bgm" : 'sound/bgm_easy.mp3',
				"discription" : "5球 / ノルマ:250m<br>統一球になった！",
				"norma_rank_first": 250,
				"norma_rank_second":400,
				"norma_rank_third": 500
			},
			"KNOCK_EX" : {
				"course_e" : "KNOCK_EX",
				"mode" : "おまけモード",
				"course_name" : "バンザイノック",
				"type_of_pitch" : 5,
				"nock" : 1,
				"powerfilter": 0.45,
				"ball_number" : 100,
				"bgm" : 'sound/bgm_extra2.mp3',
				"discription" : "100球 / ノルマ:5000m<br>わっしょいでーす",
				"norma_rank_first": 5000,
				"norma_rank_second":8000,
				"norma_rank_third": 10000
			}
		}
	};
	//初期モード、コース
	var Mode = "COMMON";
	var Course = "EASY";
	var CommonCourseIndex = 0;
	var ExtraCourseIndex = 0;

	//音ON/OFF用フラグ
	var SoundFlag = getCookie("HIDAMARISWING-SOUNDFLAG");
	function SoundFlagSwitching () {
		if(SoundFlag != 1){
			SoundFlag = 1;
		}else{
			SoundFlag = 0;
		}
		setCookie("HIDAMARISWING-SOUNDFLAG",SoundFlag);
	}

	game.onload = function(){
		//var GameMode = 0;
		var BattingBgmFile = '';

		//スペースが押されたとき呼ばれる関数呼ぶ
		function get_space(){
			//タイトル画面ならゲームスタート
			if(game.currentScene === SceneTitle){
				SceneTitle.StartButton.game_start();
			}
			//バッティング画面ならスイング
			if(game.currentScene === SceneBatting){
				if(SceneBatting.Batter.swing_flag == true){
					SceneBatting.Batter.swing();
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
		
		function initTitle(){
	 		//*タイトルシーン*
			var SceneTitle = new Scene();
			//BGM ループ再生
 			SceneTitle.addEventListener('enterframe', function(){
 				if(SoundFlag == 1){
	 				//console.log('un');
					game.assets[TITLE_BGM].play();
					game.assets[TITLE_BGM].volume = 0.4;
				}else{
					game.assets[TITLE_BGM].stop();
				}
 			});
			//矢印キーによるモード選択
			SceneTitle.addEventListener('upbuttondown', function(){
				ModeSwitching();
				SceneTitle.StartButton.label_update();
				SceneTitle.ModeDiscription.update();
				SceneTitle.ModeLabel.update();
			});
			SceneTitle.addEventListener('downbuttondown', function(){
				ModeSwitching();
				SceneTitle.StartButton.label_update();
				SceneTitle.ModeDiscription.update();
				SceneTitle.ModeLabel.update();
			});
			SceneTitle.addEventListener('leftbuttondown', function(){
				CourseDecrement();
				SceneTitle.StartButton.label_update();
				SceneTitle.ModeDiscription.update();
			});
			SceneTitle.addEventListener('rightbuttondown', function(){
				CourseIncrement();
				SceneTitle.StartButton.label_update();
				SceneTitle.ModeDiscription.update();
			});

			//*背景*
			SceneTitle.BackgroundTitle = make_Sprite(SCREEN_SIZE_X, SCREEN_SIZE_Y, 0, 0, 'img/background_title.jpg');

			//*ロゴ*
			SceneTitle.TitleLogo = make_Sprite(450, 300, 15, 0, 'img/logo.png');
			SceneTitle.TitleLogo.scale(0.9, 0.9);
	
			//*スタートボタン*
			SceneTitle.StartButton = new Label();
			SceneTitle.StartButton.num = 1;
			SceneTitle.StartButton.x = STARTBUTTON_X;
			SceneTitle.StartButton.y = STARTBUTTON_Y;
			SceneTitle.StartButton.label_update = function(){
				this.text = "<h1 class='button'>" + GameSet[Mode][Course]["course_name"] + "</h1>"
			};
			SceneTitle.StartButton.label_update();
			SceneTitle.StartButton.game_start = function(){
				BattingBgmFile = GameSet[Mode][Course]["bgm"];
				SceneBatting.LastBall.num = GameSet[Mode][Course]["ball_number"];
				SceneBatting.LastBall.max = GameSet[Mode][Course]["ball_number"];
				SceneBatting.MeetCursor.distance_powerfilter = GameSet[Mode][Course]["powerfilter"];
				SceneBatting.LastBall.update();
				game.assets[TITLE_BGM].stop();
				play_se('sound/hit_1.wav');
				game.popScene(SceneTitle);
				game.pushScene(SceneBatting);
			}
			SceneTitle.StartButton.addEventListener('touchstart', function (e) {
				this.game_start();
			});

			//*枠*
			SceneTitle.BackFrame = make_Label(20, SCREEN_SIZE_Y/2+55, "backframe", "");

			//*矢印*
			SceneTitle.ModeLeftButton = make_Sprite(DIRECTION_SIZE, DIRECTION_SIZE, 40, STARTBUTTON_Y+DIRECTION_SIZE/2, 'img/direction.gif');
			SceneTitle.ModeLeftButton.addEventListener('touchstart', function (e) {
				CourseDecrement();
				SceneTitle.StartButton.label_update();
				SceneTitle.ModeDiscription.update();
			});
			SceneTitle.ModeRightButton = make_Sprite(DIRECTION_SIZE, DIRECTION_SIZE, SCREEN_SIZE_X-DIRECTION_SIZE-40, STARTBUTTON_Y+DIRECTION_SIZE/2, 'img/direction.gif');
			SceneTitle.ModeRightButton.rotation = 180;
			SceneTitle.ModeRightButton.addEventListener('touchstart', function (e) {
				CourseIncrement();
				SceneTitle.StartButton.label_update();
				SceneTitle.ModeDiscription.update();
			});

			//*モード切替ボタン*
			SceneTitle.ModeSwitchButton = make_Sprite(DIRECTION_SIZE, DIRECTION_SIZE, SCREEN_SIZE_X/2+DIRECTION_SIZE+40, STARTBUTTON_Y-DIRECTION_SIZE/2-25, 'img/switch.gif');
			SceneTitle.ModeSwitchButton.addEventListener('touchstart', function (e) {
				ModeSwitching();
				SceneTitle.StartButton.label_update();
				SceneTitle.ModeDiscription.update();
				SceneTitle.ModeLabel.update();
			});

			//*モードラベル*
			SceneTitle.ModeLabel = make_Label(SCREEN_SIZE_X/2+DIRECTION_SIZE+85, STARTBUTTON_Y-DIRECTION_SIZE/2-17, "", "");
			SceneTitle.ModeLabel.update = function(){
				this.text = "<div class='label'>" + GameSet[Mode][Course]["mode"] + "</div>";
			}
			SceneTitle.ModeLabel.update();

			//*モードクリア表示*
			SceneTitle.ModeClearLabel = make_Label(0, STARTBUTTON_Y+119, "", "");
			SceneTitle.ModeClearLabel.update = function(){
				var rank = getCookie("CLEARRANK-" + GameSet[Mode][Course]["course_e"]);
				var high_score = getCookie("HIGHSCORE-" + GameSet[Mode][Course]["course_e"]);
				if(rank==0){
					this.text = "<div id='clear_label'>ハイスコア:"+high_score+"m</div>";
				}else if(rank==1){
					this.text = "<div id='clear_label'>ハイスコア:"+high_score+"m ★</div>";
				}else if(rank==2){
					this.text = "<div id='clear_label'>ハイスコア:"+high_score+"m ★★</div>";
				}else if(rank==3){
					this.text = "<div id='clear_label'>ハイスコア:"+high_score+"m ★★★</div>";
				}
			}
			SceneTitle.ModeClearLabel.update();

			//*モード説明*
			SceneTitle.ModeDiscription = make_Label(0, STARTBUTTON_Y+65, "", "");
			SceneTitle.ModeDiscription.update = function(){
				this.text = "<div id='discription'>" + GameSet[Mode][Course]["discription"] + "</div>";
				SceneTitle.ModeClearLabel.update();
			}
			SceneTitle.ModeDiscription.update();

			//*操作説明ボタン*
			SceneTitle.HelpButton = new Label();
			SceneTitle.HelpButton.width = 130;
			SceneTitle.HelpButton.x = SCREEN_SIZE_X-130;
			SceneTitle.HelpButton.y = SCREEN_SIZE_Y-60;
			SceneTitle.HelpButton.text = "<h1 id='helpbutton' class='button'>操作説明</h1>";
			SceneTitle.HelpButton.addEventListener('touchstart', function (e) {
				game.popScene(SceneTitle);
				game.pushScene(SceneHelp);
			});

			//*記録閲覧ボタン*
			SceneTitle.RecordButton = new Label();
			SceneTitle.RecordButton.width = 130;
			SceneTitle.RecordButton.x = 10;
			SceneTitle.RecordButton.y = SCREEN_SIZE_Y-60;
			SceneTitle.RecordButton.text = "<h1 id='recordbutton'>トロフィー</h1>";
			SceneTitle.RecordButton.addEventListener('touchstart', function (e) {
				game.popScene(SceneTitle);
				game.pushScene(SceneRecord);
			});

			//*音ボタン*
			if(SoundFlag == 1){
				var sound_img = 'img/sound.gif';
			}else{
				var sound_img = 'img/sound_n.gif';
			}
			SceneTitle.SoundButton = make_Sprite(40, 40, SCREEN_SIZE_X-50, 10, sound_img);
			SceneTitle.SoundButton.addEventListener('touchstart', function (e) {
				SoundFlagSwitching();
				if(SoundFlag == 1){
					this.image = game.assets['img/sound.gif'];
				}else{
					this.image = game.assets['img/sound_n.gif'];
				}
			});

			//event listener
			SceneTitle.addEventListener('enterframe', function (e) {
				if(SceneTitle.ModeLeftButton.scaleX > 1){
					SceneTitle.ModeLeftButton.scaleX -= 0.15;
					SceneTitle.ModeLeftButton.scaleY -= 0.15;
				}else{
					SceneTitle.ModeLeftButton.scaleX = 1;
					SceneTitle.ModeLeftButton.scaleY = 1;
				}

				if(SceneTitle.ModeRightButton.scaleX > 1){
					SceneTitle.ModeRightButton.scaleX -= 0.15;
					SceneTitle.ModeRightButton.scaleY -= 0.15;
				}else{
					SceneTitle.ModeRightButton.scaleX = 1;
					SceneTitle.ModeRightButton.scaleY = 1;
				}

				if(SceneTitle.ModeSwitchButton.scaleX > 1){
					SceneTitle.ModeSwitchButton.scaleX -= 0.15;
					SceneTitle.ModeSwitchButton.scaleY -= 0.15;
				}else{
					SceneTitle.ModeSwitchButton.scaleX = 1;
					SceneTitle.ModeSwitchButton.scaleY = 1;
				}
			});

			var CourseIncrement = function(){
				SceneTitle.ModeRightButton.scaleX = 1.45;
				SceneTitle.ModeRightButton.scaleY = 1.45;

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
				SceneTitle.ModeMarkerPin.update();
			}
			var CourseDecrement = function(){
				SceneTitle.ModeLeftButton.scaleX = 1.45;
				SceneTitle.ModeLeftButton.scaleY = 1.45;

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
				SceneTitle.ModeMarkerPin.update();
			}

			var ModeSwitching = function(){
				SceneTitle.ModeSwitchButton.scaleX = 1.45;
				SceneTitle.ModeSwitchButton.scaleY = 1.45;
				if(Mode == "COMMON"){
					Mode = "EXTRA";
					Course = ExtraCourse[ExtraCourseIndex];
					SceneTitle.BackFrame.text = "<div class=\"backframe_ex\"></div>";
				}else{
					Mode = "COMMON";
					Course = CommonCourse[CommonCourseIndex];
					SceneTitle.BackFrame.text = "<div class=\"backframe\"></div>";
				}
				SceneTitle.ModeMarkerPin.update();
			}

			//*モードマーカーピン*
			SceneTitle.ModeMarkerPin = make_Label(0,297,"marker_pin","test");
			SceneTitle.ModeMarkerPin.update = function(){
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
				SceneTitle.ModeMarkerPin.text = "<div class=\"marker_pin\">" + markerText + "</div>";
			}
			SceneTitle.ModeMarkerPin.update();

			if(CommonCourse.length < 2){
				SceneTitle.ModeMarkerPin.visible = false;
				SceneTitle.ModeLeftButton.visible = false;
				SceneTitle.ModeRightButton.visible = false;
			}

			//add
			SceneTitle.addChild(SceneTitle.BackgroundTitle);
			SceneTitle.addChild(SceneTitle.TitleLogo);
			SceneTitle.addChild(SceneTitle.BackFrame);
			SceneTitle.addChild(SceneTitle.ModeLabel);
			SceneTitle.addChild(SceneTitle.StartButton);
			SceneTitle.addChild(SceneTitle.ModeLeftButton);
			SceneTitle.addChild(SceneTitle.ModeRightButton);
			SceneTitle.addChild(SceneTitle.ModeSwitchButton);
			SceneTitle.addChild(SceneTitle.ModeDiscription);
			SceneTitle.addChild(SceneTitle.ModeClearLabel);
			SceneTitle.addChild(SceneTitle.ModeMarkerPin);
			SceneTitle.addChild(SceneTitle.RecordButton);
			SceneTitle.addChild(SceneTitle.HelpButton);
			SceneTitle.addChild(SceneTitle.SoundButton);

			return SceneTitle;
		}

//*********************
//操作説明画面
//*******************
		
		function initHelp(){
			//*操作説明画面シーン*
			var SceneHelp = new Scene();

			//*背景*
			SceneHelp.BackgroundHelp = make_Sprite(SCREEN_SIZE_X, SCREEN_SIZE_Y, 0, 0, 'img/background_title.jpg');

			//*戻るボタン*
			SceneHelp.HelpTitleBackButton = new Label();
			SceneHelp.HelpTitleBackButton.x = SCREEN_SIZE_X-130;
			SceneHelp.HelpTitleBackButton.y = SCREEN_SIZE_Y-60;
			SceneHelp.HelpTitleBackButton.text = "<h1 id='helpbutton' class='button'>戻る</h1>";
			SceneHelp.HelpTitleBackButton.addEventListener('touchstart', function (e) {
				game.popScene(SceneHelp);
				game.pushScene(SceneTitle);
			});

			//*テキスト*/
			SceneHelp.HelpText = make_Label(10, 10, "help", "<p>操作説明</p><p>バッターを操作してボールを打つ</p><img src='./img/swing.png'>	<p><p><div><b>PCでの操作</b></div><div>スペースキーでスイング / 矢印キーで上下左右移動</div></p><p><div><b>スマホ・タブレットでの操作</b></div><div>右下の〇でスイング / 左下の矢印で上下左右移動</div></p><p><div>左方向に飛んだら振りが早め、右方向に飛んだら振りが遅め</div><div>これを参考にタイミングよくジャストミートしよう！</div></p></p><span class='copyright'>[BGM]フリーBGM・音楽素材MusMus:http://musmus.main.jp</span></div>");
			SceneHelp.addChild(SceneHelp.BackgroundHelp);
			SceneHelp.addChild(SceneHelp.HelpText);
			SceneHelp.addChild(SceneHelp.HelpTitleBackButton);

			return SceneHelp;
		}

//*********************
//実績画面
//*******************
		
		function initRecord(){
			//*実績画面シーン*
			var SceneRecord = new Scene();

			//*背景*
			SceneRecord.BackgroundRecord = make_Sprite(SCREEN_SIZE_X, SCREEN_SIZE_Y, 0, 0, 'img/background_title.jpg');
			
			//*枠*
			SceneRecord.RecordFrame = make_Label(10, 10, "recordframe", "");
			var getTrophy = [];
			for(var key in TROPHY_DATA){
				if(getCookie(key)){
					getTrophy.push(TROPHY_DATA[key]);
				}
			}
			var nowTrophyPage = 1;

			//*トロフィーリスト*
			SceneRecord.TrophyList = make_Label(10, 10, "trophy_list", "");
			function trophyListUpdate(page){
				var trophyText = ""
					trophyText = "<div id='trophy_list'>";
					//console.log(TROPHY_DATA)

				for(var i = (page-1)*8;i<getTrophy.length && i < (page-1)*8 + 8;i++){
					trophyText += "<p><span>"+getTrophy[i]['name']+"</span><br>"+getTrophy[i]['text']+"</p>";
				}

				trophyText += "</div>";
				SceneRecord.TrophyList.text = trophyText;
			}
			trophyListUpdate(nowTrophyPage);

			//*戻るボタン*
			SceneRecord.RecordTitleBackButton = new Label();
			SceneRecord.RecordTitleBackButton.x = 10;
			SceneRecord.RecordTitleBackButton.y = SCREEN_SIZE_Y-60;
			SceneRecord.RecordTitleBackButton.text = "<h1 id='helpbutton' class='button'>戻る</h1>";
			SceneRecord.RecordTitleBackButton.addEventListener('touchstart', function (e) {
				game.popScene(SceneRecord);
				game.pushScene(SceneTitle);
			});

			//*矢印*
			SceneRecord.TrophyLeftButton = make_Sprite(DIRECTION_SIZE, DIRECTION_SIZE, 139, 425, 'img/trophy_direction.gif');
			SceneRecord.TrophyLeftButton.addEventListener('touchstart', function (e) {
				trophyBackPage();
			});
			SceneRecord.TrophyRightButton = make_Sprite(DIRECTION_SIZE, DIRECTION_SIZE, SCREEN_SIZE_X-DIRECTION_SIZE-15, 425, 'img/trophy_direction.gif');
			SceneRecord.TrophyRightButton.rotation = 180;
			SceneRecord.TrophyRightButton.addEventListener('touchstart', function (e) {
				trophyNextPage();
			});

			//*テキスト*
			SceneRecord.RecordTrophyText = make_Label(185, 430, "", "");
			SceneRecord.RecordTrophyText.text = "<div id='trophy_text'></div>";
			function trophyTextUpdate(){
				SceneRecord.RecordTrophyText.text = "<div id='trophy_text'>page"+nowTrophyPage+"/"+(parseInt((getTrophy.length-1)/8)+1)+" 取得数"+getTrophy.length+"コ</div>";	
				if(nowTrophyPage*8 < getTrophy.length){
					SceneRecord.TrophyRightButton.visible = true;
				}else{
					SceneRecord.TrophyRightButton.visible = false;
				}

				if(nowTrophyPage == 1){
					SceneRecord.TrophyLeftButton.visible = false;
				}else{
					SceneRecord.TrophyLeftButton.visible = true;
				}
			}
			function trophyNextPage(){
				if(nowTrophyPage*8 < getTrophy.length){
					nowTrophyPage++;
					trophyListUpdate(nowTrophyPage);
					trophyTextUpdate();
				}
			}
			function trophyBackPage(){
				if(nowTrophyPage > 1){
					nowTrophyPage--;
					trophyListUpdate(nowTrophyPage);
					trophyTextUpdate();
				}
			}
			trophyTextUpdate();
			SceneRecord.addEventListener('leftbuttondown', function(){
				trophyBackPage();
			});
			SceneRecord.addEventListener('rightbuttondown', function(){
				trophyNextPage();
			});

			SceneRecord.addChild(SceneRecord.BackgroundRecord);
			SceneRecord.addChild(SceneRecord.RecordFrame);
			SceneRecord.addChild(SceneRecord.RecordTitleBackButton);
			SceneRecord.addChild(SceneRecord.TrophyList);
			SceneRecord.addChild(SceneRecord.RecordTrophyText);
			SceneRecord.addChild(SceneRecord.TrophyLeftButton);
			SceneRecord.addChild(SceneRecord.TrophyRightButton);

			return SceneRecord;
		}

//*********************
//バッティング画面
//*********************
		
		function initBatting(){
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
			SceneBatting.BackgroundBatting = make_Sprite(GROUND_SIZE_X, GROUND_SIZE_Y, 0, -800, 'img/background_batting.jpg');
			SceneBatting.BackgroundBatting.scale(2,2);

			//*バーチャルキーパッド*
			SceneBatting.KeyPad = new Pad();
			SceneBatting.KeyPad.x = PAD_X;
			SceneBatting.KeyPad.y = PAD_Y;

			//*スイングボタン*
			SceneBatting.SwingButton = make_Sprite(SWINGBUTTON_SIZE, SWINGBUTTON_SIZE, SWINGBUTTON_X, SWINGBUTTON_Y, 'img/swing_button.png');
			// タッチ開始時処理
			SceneBatting.SwingButton.ontouchstart = function() {
				get_space();
	        };
	
			//*残り球数*
			SceneBatting.LastBall = make_Label(LASTBALL_X, LASTBALL_Y, "", "");
			SceneBatting.LastBall.num = BALL_NUM;
			SceneBatting.LastBall.max = BALL_NUM;
			SceneBatting.LastBall.battedball_num = 0; //打球の数
			SceneBatting.LastBall._element.style.zIndex = 5;
			SceneBatting.LastBall.update = function(){
				this.text = "<div class='statelabel'>残り<img src='img/ball_thum.gif'>×"+this.num+"</div>";
			}
			SceneBatting.LastBall.update();
			SceneBatting.LastBall.decrement = function(){
				this.update();
				if(this.num == 0 && this.battedball_num == 0 && SceneBatting.Pitcher.throw_flag == true && SceneBatting.bgm_fadeout == false){
					SceneBatting.bgm_fadeout = true;
					//console.log("ゲーム終了");
					setTimeout(function(){
						if(SoundFlag == 1){
							game.assets[RESULT_BGM].stop();
							game.assets[RESULT_BGM].play();
							game.assets[RESULT_BGM].volume = 0.4;
						}
						SceneBatting.Point.visible = false;
						SceneBatting.StateFrame.visible = false;
						SceneBatting.LastBall.visible = false;
						
						game.pushScene(SceneResult);
						//------クッキー処理-----
						cookieUpdate(GameSet[Mode][Course]["course_e"], SceneBatting.Point, GameSet[Mode][Course]["ball_number"]);
						//--------------------
					},3000);
				}
			}

			//*得点*
			SceneBatting.Point = make_Label(POINT_X, POINT_Y, "", "");
			SceneBatting.Point.num = 0;
			SceneBatting.Point.ball =  new Array(); //ボール別のスコア
			SceneBatting.Point.miss = 0; //空振り率
			SceneBatting.Point.max = 0; //最高飛距離
			SceneBatting.Point.justmeet = 0; //真芯率
			SceneBatting.Point._element.style.zIndex = 5;
			SceneBatting.Point.update = function(){
				this.text = "<div class='statelabel'>合計"+this.num+"m</div>";
			}
			SceneBatting.Point.update();
			SceneBatting.Point.addition = function(point, hit_se){
				this.num += point;
				this.update();
				this.obj = new Object();
				this.obj['hit_se'] = hit_se;
				this.obj['score'] = point;
				this.ball.push(this.obj);
				addCount(this.obj);

				//真芯カウントの追加
				if(hit_se == 'sound/hit_ex.wav'){
					this.justmeet++;
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
			SceneBatting.Point.reset = function(){
				SceneBatting.Point.num = 0;
				SceneBatting.Point.ball =  null;
				SceneBatting.Point.ball =  new Array(); //ボール別のスコア
				SceneBatting.Point.miss = 0; //空振り率
				SceneBatting.Point.max = 0; //最高飛距離
				SceneBatting.Point.justmeet = 0; //真芯率
			}

			//*表示系枠*
			SceneBatting.StateFrame = make_Label(0, 0, "stateframe", "");
			SceneBatting.StateFrame._element.style.zIndex = 5;
	
			//*表示系グループ*
			SceneBatting.States = new Group();
			SceneBatting.States.x = STATES_X;
			SceneBatting.States.y = STATES_Y;
			SceneBatting.States.addChild(SceneBatting.StateFrame);
			SceneBatting.States.addChild(SceneBatting.LastBall);
			SceneBatting.States.addChild(SceneBatting.Point);

			//*投球（ミートカーソルのあたり判定用にここで変数定義）*
			SceneBatting.Ball;

			//*ピッチャー*
			SceneBatting.Pitcher = make_Sprite(PITCHER_SIZE_X, PITCHER_SIZE_Y, PITCHER_X, PITCHER_Y, 'img/yuno.gif');
			SceneBatting.Pitcher._element.style.zIndex = 2;
			//投げるflag
			SceneBatting.Pitcher.throw_flag = true;
			//投球間隔カウント変数
			SceneBatting.Pitcher.throw_interval_count = -30; //初回
			//アニメーションフレーム
			SceneBatting.Pitcher.frame_num = 0;
			//投球関数（引数で投球コース、スピードとか
			SceneBatting.Pitcher.throw_ball = function(template_num){
				SceneBatting.Ball = make_Sprite(BALL_SIZE, BALL_SIZE, BALL_DEFAULT_X+BALL_SIZE/2, BALL_DEFAULT_Y, 'img/throw_ball.gif');
				SceneBatting.Ball._element.style.zIndex = 4;
				SceneBatting.Ball.frame_num = 0;
				SceneBatting.LastBall.num--;
				SceneBatting.LastBall.decrement();
				//球種の数値は基本的に モード数×100+通し番号 とする イージーの1番目なら101 
				switch(template_num){
					case 0:
						//テンプレート呼ばない場合（超ランダムとか用に用意しとく、使わないかも）
						break;

					case 1: //デバック用 固定球
						SceneBatting.Ball.speed_x = 0;
						SceneBatting.Ball.speed_y = 0;

						SceneBatting.Ball.x = SceneBatting.MeetCursor.x + MEETCURSOR_SIZE_X/2 - 7.5;
						SceneBatting.Ball.y = SceneBatting.MeetCursor.y + MEETCURSOR_SIZE_Y/2 - 7.5;
						//フレーム処理
						SceneBatting.Ball.addEventListener('enterframe', function(){

						});
						break;

						//イージー用球種
						case 101: //イージーモード用ストレート 左右に少し角度がつく
							SceneBatting.Ball.direction_x = (Math.random() - Math.random()) * 0.6;//1:右、-1:左
							SceneBatting.Ball.direction_y = 1;//1:前、-1:後
							SceneBatting.Ball.speed_x = 1;
							SceneBatting.Ball.speed_y = 9 + Math.random() * 3;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.x = this.x + this.direction_x*this.speed_x;
								this.y = this.y + this.direction_y*this.speed_y;
							});
							break;

						//ノーマル用球種
						case 201: //ノーマルモード用 ストレート 左右に少し角度がつく
							SceneBatting.Ball.direction_x = (Math.random() - Math.random()) * 0.8;//1:右、-1:左
							SceneBatting.Ball.direction_y = 1;//1:前、-1:後
							SceneBatting.Ball.speed_x = 1;
							SceneBatting.Ball.speed_y = 10 + Math.random() * 3;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.x = this.x + this.direction_x*this.speed_x;
								this.y = this.y + this.direction_y*this.speed_y;
							});
							break;

						case 202: //カーブとシンカー：弧を描く
							SceneBatting.Ball.carve = Math.random() * 3 + 2;
							if(parseInt(Math.random()*10)%2 == 1){
								SceneBatting.Ball.carve *= -1;
							}
							SceneBatting.Ball.speed_x = SceneBatting.Ball.carve;
							SceneBatting.Ball.speed_y = 8 + Math.random() * 3;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.speed_x -=  SceneBatting.Ball.carve/21;
								this.x = this.x + this.speed_x;
								this.y = this.y + this.speed_y;
							});
							break;

						case 203: //ナックル：ぶれて見切りづらいボール
							SceneBatting.Ball.speed_x = (Math.random() - Math.random()) * 0.7;
							SceneBatting.Ball.speed_y = 9 + Math.random() * 2;
							SceneBatting.Ball.bure = 30;
							SceneBatting.Ball.throw_frame = 0;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.throw_frame ++;
								if(SceneBatting.Ball.throw_frame == 1){
									this.x += SceneBatting.Ball.bure/2;
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
							SceneBatting.Ball.speed_x = (Math.random() - Math.random()) * 0.8;
							SceneBatting.Ball.speed_y = 5 + Math.random() * 3;
							SceneBatting.Ball.buoyancy = -6;
							SceneBatting.Ball.throw_frame = 0;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.throw_frame ++;
								SceneBatting.Ball.buoyancy += 0.3
								this.x = this.x + this.speed_x;
								this.y = this.y + this.speed_y + SceneBatting.Ball.buoyancy;
							});
							break;

						//ゆのさま用球種
						case 301: //ハードモード用 ストレート 左右に少し角度がつく
							SceneBatting.Ball.direction_x = (Math.random() - Math.random());//1:右、-1:左
							SceneBatting.Ball.direction_y = 1;//1:前、-1:後
							SceneBatting.Ball.speed_x = 1;
							SceneBatting.Ball.speed_y = 15 + Math.random() * 3;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.x = this.x + this.direction_x*this.speed_x;
								this.y = this.y + this.direction_y*this.speed_y;
							});
							break;

						case 302: //オウルボール
							SceneBatting.Ball.speed_x = (Math.random() - Math.random()) * 0.3;
							SceneBatting.Ball.speed_ex_x = 9;
							SceneBatting.Ball.speed_y =5 + Math.random() * 3;
							SceneBatting.Ball.throw_frame = 4;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.throw_frame ++;
								if(this.throw_frame % 8 == 0){
									SceneBatting.Ball.speed_ex_x *= -1;
								}
								this.x = this.x + this.speed_x + this.speed_x + this.speed_ex_x;
								this.y = this.y + this.speed_y;
							});
							break;

						case 303: //チェンジアップ：スローボールの強化版

							SceneBatting.Ball.speed_x = (Math.random() - Math.random()) * 0.8;
							SceneBatting.Ball.speed_y = 5 + Math.random() * 3;
							SceneBatting.Ball.buoyancy = -9;
							SceneBatting.Ball.throw_frame = 0;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.throw_frame ++;
								SceneBatting.Ball.buoyancy += 0.4
								this.x = this.x + this.speed_x;
								this.y = this.y + this.speed_y + SceneBatting.Ball.buoyancy;
							});
							break;

						case 304: //超ナックル：着弾までブレるボール
							SceneBatting.Ball.speed_x = (Math.random() - Math.random());
							SceneBatting.Ball.speed_y = 10 + Math.random() * 5;
							SceneBatting.Ball.bure = 50;
							SceneBatting.Ball.throw_frame = 0;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.throw_frame ++;
								if(SceneBatting.Ball.throw_frame == 1){
									this.x += SceneBatting.Ball.bure/2;
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
							SceneBatting.Ball.direction_x = (Math.random() - Math.random()) * 0.9;//1:右、-1:左
							SceneBatting.Ball.direction_y = 1;//1:前、-1:後
							SceneBatting.Ball.speed_x = 1;
							SceneBatting.Ball.speed_y = 10 + Math.random() * 3;
							SceneBatting.Ball.throw_frame = 0;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.x = this.x + this.direction_x*this.speed_x;
								this.y = this.y + this.direction_y*this.speed_y;
								
								if(this.y < SceneBatting.Pitcher.y + 330){
									this.throw_frame++;
									switch(this.throw_frame%5){
										case 0:
											this.visible = false;
											break;
										case 1:
											this.visible = true;
											break;
									}
								}else if(this.y >= SceneBatting.Pitcher.y + 330){
									this.visible = false;
								}
							});
							break;

						case 306: //超カーブ超シンカー：弧を描く
							SceneBatting.Ball.carve = Math.random() * 2 + 13;
							if(parseInt(Math.random()*10)%2 == 1){
								SceneBatting.Ball.carve *= -1;
							}
							SceneBatting.Ball.speed_x = SceneBatting.Ball.carve;
							SceneBatting.Ball.speed_y = 14;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.speed_x -= SceneBatting.Ball.carve/12.5;
								this.x = this.x + this.speed_x;
								this.y = this.y + this.speed_y;
							});
							break;

						case 307: //ループシュート
							SceneBatting.Ball.speed_x = (Math.random() - Math.random()) * 0.5;//1:右、-1:左
							SceneBatting.Ball.speed_y = 1.9;
							SceneBatting.Ball.roll_speed = 3;
							SceneBatting.Ball.roll = 180;
							
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.roll_speed += 0.05;
								this.roll += 10;
								this.x += this.roll_speed * Math.cos((this.roll) * Math.PI/180);
								this.y += this.roll_speed * Math.sin((this.roll) * Math.PI/180);
								this.x = this.x + this.speed_x;
								this.y = this.y + this.speed_y;
							});
							break;

						case 308: //収縮ショット
							SceneBatting.Ball.x -= 40;
							SceneBatting.Ball.speed_x = (Math.random() - Math.random()) * 0.1;//1:右、-1:左
							SceneBatting.Ball.speed_y = 4;
							SceneBatting.Ball.roll_speed = 100;
							SceneBatting.Ball.roll = 180;
							
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
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
							SceneBatting.Ball.direction_x = (Math.random() - Math.random()) * 1.1;//1:右、-1:左
							SceneBatting.Ball.direction_y = 1;//1:前、-1:後
							SceneBatting.Ball.speed_x = 1;
							SceneBatting.Ball.speed_y = 12 + Math.random() * 6;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.x = this.x + this.direction_x*this.speed_x;
								this.y = this.y + this.direction_y*this.speed_y;
								
							});
							break;

						//ノックモードその2用球種
						case 501: //ストレート 左右に少し角度がつく
							SceneBatting.Ball.direction_x = (Math.random() - Math.random()) * 1.0;//1:右、-1:左
							SceneBatting.Ball.direction_y = 1;//1:前、-1:後
							SceneBatting.Ball.speed_x = 1;
							SceneBatting.Ball.speed_y = 13 + Math.random() * 2;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.x = this.x + this.direction_x*this.speed_x;
								this.y = this.y + this.direction_y*this.speed_y;
							});
							break;

						//ハード用球種
						case 601: //ノーマルモード用 ストレート 左右に少し角度がつく
							SceneBatting.Ball.direction_x = (Math.random() - Math.random()) * 0.9;//1:右、-1:左
							SceneBatting.Ball.direction_y = 1;//1:前、-1:後
							SceneBatting.Ball.speed_x = 1;
							SceneBatting.Ball.speed_y = 14 + Math.random() * 3;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.x = this.x + this.direction_x*this.speed_x;
								this.y = this.y + this.direction_y*this.speed_y;
							});
							break;

						case 602: //カーブとシンカー：弧を描く
							SceneBatting.Ball.carve = Math.random() * 3 + 4;
							if(parseInt(Math.random()*10)%2 == 1){
								SceneBatting.Ball.carve *= -1;
							}
							SceneBatting.Ball.speed_x = SceneBatting.Ball.carve;
							SceneBatting.Ball.speed_y = 11 + Math.random() * 2;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.speed_x -=  SceneBatting.Ball.carve/16;
								this.x = this.x + this.speed_x;
								this.y = this.y + this.speed_y;
							});
							break;

						case 603: //ナックル：ぶれて見切りづらいボール
							SceneBatting.Ball.speed_x = (Math.random() - Math.random()) * 0.85;
							SceneBatting.Ball.speed_y = 11 + Math.random() * 2;
							SceneBatting.Ball.bure = 30;
							SceneBatting.Ball.throw_frame = 0;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.throw_frame ++;
								if(SceneBatting.Ball.throw_frame == 1){
									this.x += SceneBatting.Ball.bure/2;
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
							SceneBatting.Ball.speed_x = (Math.random() - Math.random()) * 0.8;
							SceneBatting.Ball.speed_y = 5 + Math.random() * 3;
							SceneBatting.Ball.buoyancy = -6;
							SceneBatting.Ball.throw_frame = 0;
							//フレーム処理
							SceneBatting.Ball.addEventListener('enterframe', function(){
								this.throw_frame ++;
								SceneBatting.Ball.buoyancy += 0.35;
								this.x = this.x + this.speed_x;
								this.y = this.y + this.speed_y + SceneBatting.Ball.buoyancy;
							});
							break;
					}

					//空振り処理
					SceneBatting.Ball.addEventListener('enterframe', function(){
						if ( this.y >= GROUND_SIZE_Y ) {
							SceneBatting.Camera.removeChild(this);
							SceneBatting.Pitcher.throw_flag = true;
							SceneBatting.LastBall.decrement();
							SceneBatting.Point.addition(0, -1); //空振りスコアの追加
							SceneBatting.Ball.clearEventListener();//一応
						}else{
							SceneBatting.Ball.frame_num++;
							if(SceneBatting.Ball.frame_num > 6){
								SceneBatting.Ball.frame_num = 0;
							}
							SceneBatting.Ball.frame = SceneBatting.Ball.frame_num;
						}
					});
					SceneBatting.Camera.addChild(SceneBatting.Ball);
				};

			//フレーム処理
			SceneBatting.Pitcher.addEventListener('enterframe', function(){
				if(SceneBatting.Camera.timestart){
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
								if(SceneBatting.LastBall.num %2 == 1){
									this.ball_type += 1 +  parseInt(Math.random()*10%3);
								}
							}else if(GameSet[Mode][Course]["type_of_pitch"] == 3){//ゆのさまモード
								//常に変化球も投げる
								this.ball_type += parseInt(Math.random()*10%8);
							}else if(GameSet[Mode][Course]["type_of_pitch"] == 6){
								//残り球数が奇数の時に変化球を混ぜる
								if(SceneBatting.LastBall.num %2 == 1){
									this.ball_type += 1 +  parseInt(Math.random()*10%3);
								}
							}else if(GameSet[Mode][Course]["type_of_pitch"] == 7){
								if(SceneBatting.LastBall.num > 8){
									this.ball_type = 202; 		
								}else if(SceneBatting.LastBall.num == 8){
									this.ball_type = 204;
								}else if(SceneBatting.LastBall.num > 5){
									this.ball_type = 602;
								}else if(SceneBatting.LastBall.num == 5){
									this.ball_type = 604;
								}else if(SceneBatting.LastBall.num == 4){
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
						else if ((this.frame_num < 9) && (SceneBatting.LastBall.num > 0)) {
							this.throw_interval_count++;
							if(GameSet[Mode][Course]["nock"] == 1 && SceneBatting.LastBall.num != SceneBatting.LastBall.max){
								this.throw_interval_count = PITCH_INTERVAL;
							}
						}
						//セットモーション
						else if((this.frame_num >= 9) && (this.throw_interval_count == 0)){
							if(GameSet[Mode][Course]["nock"] == 1 && SceneBatting.LastBall.num > 0){
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
			SceneBatting.Bat = make_Sprite(96, 32, BATTER_DEFAULT_X+BATTER_SIZE_X/2+10, BATTER_DEFAULT_Y+BATTER_SIZE_Y/2, 'img/bat.gif');
			SceneBatting.Bat.swing_frame = 0; //スイングした時のフレームカウント
			SceneBatting.Bat._element.style.zIndex = 3;
			SceneBatting.Bat.rotation = 0;
			SceneBatting.Bat.addEventListener('enterframe', function(){
				if(SceneBatting.Camera.timestart){
					SceneBatting.Bat.swing_frame++;
					if(SceneBatting.Batter.swing_flag == false){	
						if(this.swing_frame==1){ //宮子中割の設定とバットの初期化
							SceneBatting.Bat.x = -9999; //再表示で不自然にならないように退ける
							SceneBatting.Bat.rotation = 33;
							SceneBatting.Batter.frame = 2; //振る前の中割を設定
						}else if(this.swing_frame < 6){
							SceneBatting.Batter.frame = 3; //振るアニメ
							SceneBatting.Bat.rotation -= 15; 
							//回転と位置が同期するように差分を取る
							SceneBatting.Bat.distance_x = -48 * Math.cos((SceneBatting.Bat.rotation + 180) * Math.PI/180);
							SceneBatting.Bat.distance_y = -48 * Math.sin((SceneBatting.Bat.rotation + 180) * Math.PI/180);
							//差分を利用してバッターの腕にくっつける
							SceneBatting.Bat.x = SceneBatting.Batter.x + SceneBatting.Bat.distance_x + 22;
							SceneBatting.Bat.y = SceneBatting.Batter.y + BATTER_SIZE_Y/2 + SceneBatting.Bat.distance_y + 2;
						}else if(this.swing_frame == 6){
							SceneBatting.Batter.frame = 4; //振るアニメ
							SceneBatting.Bat.x = -9999; //表示が不自然にならないように退ける
						}else if(this.swing_frame == 7){
							SceneBatting.Batter.frame = 5; //振るアニメ
						}else if(this.swing_frame == 8){
							SceneBatting.Batter.frame = 6; //振るアニメ
						}else if(this.swing_frame == 14){
							SceneBatting.Batter.frame = 5; //振るアニメ
						}
						//投球されている場合振り切ったままになるように制御
						if(SceneBatting.Pitcher.throw_flag == false && this.swing_frame > 10 && GameSet[Mode][Course]["nock"] == 0){
							this.swing_frame = 10;
						}
						if(this.swing_frame >= 15){
							SceneBatting.Camera.removeChild(SceneBatting.Bat);
							SceneBatting.Bat.swing_frame= 0; //フレームカウントリセット
							SceneBatting.Batter.swing_flag = true;	
							SceneBatting.Batter.frame = 1; //振るアニメ
						}
					}
				}
			});
 
			//*バッター*
			SceneBatting.Batter = make_Sprite(BATTER_SIZE_X, BATTER_SIZE_Y, BATTER_DEFAULT_X, BATTER_DEFAULT_Y, 'img/miyako.gif');
			SceneBatting.Batter.frame = 0;
			SceneBatting.Batter.swing_flag = true;
			SceneBatting.Batter._element.style.zIndex = 3;

			//スイング（スペース押したときの）処理
			SceneBatting.Batter.swing = function(){
				//console.log('swing'); //for debug
				this.swing_flag = false;	
				SceneBatting.Camera.addChild(SceneBatting.Bat);
			}

			//フレーム処理
			SceneBatting.Batter.addEventListener('enterframe', function(){
				if(SceneBatting.Camera.timestart){
					//構えモーション
					if(this.swing_flag == true ){
						if(SceneBatting.Pitcher.throw_flag == false){
							if(this.frame == 0){
								this.frame = 1;
							}
						}else if(SceneBatting.Pitcher.throw_flag == true){
							if(this.frame == 1){
								this.frame = 0;
							}
						}
					}
					//移動
					if(this.swing_flag == true || SceneBatting.Bat.swing_frame < 4){
						if(game.input.up && SceneBatting.Batter.y > BATTER_DEFAULT_Y-BATTER_LIMIT_Y){
							SceneBatting.Batter.y = SceneBatting.Batter.y - 3;
						}else if(game.input.down && SceneBatting.Batter.y < BATTER_DEFAULT_Y+BATTER_LIMIT_Y){
							SceneBatting.Batter.y = SceneBatting.Batter.y + 3;
						}
						if(game.input.left && SceneBatting.Batter.x > BATTER_DEFAULT_X-BATTER_LIMIT_X){
							SceneBatting.Batter.x = SceneBatting.Batter.x - 2;
						}else if(game.input.right && SceneBatting.Batter.x < BATTER_DEFAULT_X+BATTER_LIMIT_X){
							SceneBatting.Batter.x = SceneBatting.Batter.x + 2;
						}
					}
				}
			});

			//*ミートカーソル*
			SceneBatting.MeetCursor = make_Sprite(MEETCURSOR_SIZE_X, MEETCURSOR_SIZE_Y, MEETCURSOR_DEFAULT_X, MEETCURSOR_DEFAULT_Y, 'img/meetcursor.png');
			
			//ヒットフラグ
			SceneBatting.MeetCursor.hit_flag = false;
			
			//芯からずれた際の減少補正
			SceneBatting.MeetCursor.distance_powerfilter = 1.0;

			//フレーム処理
			SceneBatting.MeetCursor.addEventListener('enterframe', function(){
				if(SceneBatting.Camera.timestart){
					if(SceneBatting.Pitcher.throw_flag == false){
						if(SceneBatting.MeetCursor.intersect(SceneBatting.Ball) && SceneBatting.Bat.swing_frame == 3){
							SceneBatting.LastBall.battedball_num++;
							SceneBatting.Camera.removeChild(SceneBatting.Ball);
							//console.log('ヒット'); //for debag
							SceneBatting.MeetCursor.hit_flag = false;
							//打球角度
							var angle = 90 - ((SceneBatting.Ball.y + BALL_SIZE/2) - (SceneBatting.MeetCursor.y + MEETCURSOR_SIZE_Y/2)) * 2.5 * -1;
							//console.log('angle:'+angle);//for debug
							//ミートカーソルとボールの距離計算
							var distance = Math.sqrt(Math.pow((SceneBatting.Ball.x + BALL_SIZE/2) - (SceneBatting.MeetCursor.x + MEETCURSOR_SIZE_X/2), 2) + Math.pow((SceneBatting.Ball.y + BALL_SIZE/2) - (SceneBatting.MeetCursor.y + MEETCURSOR_SIZE_Y/2), 2) * 0.6);
							//console.log('distance:'+distance);//for debug
							//真芯値
							var meetpoint = 32;
							//打球スピード
							var batted_speed = (meetpoint - (distance * this.distance_powerfilter))* 0.7;
							SceneBatting.Effect.add(2, SceneBatting.Ball.x ,  SceneBatting.Ball.y); //ヒットエフェクト
							//真芯演出
							if(batted_speed > 19.5){
								SceneBatting.Camera.timestop = 10;
								//console.log(CAMERA_BATTING_X);
								SceneBatting.Effect.add(1, - SceneBatting.Camera.x ,  - SceneBatting.Camera.y); //集中線エフェクト
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
							var BattedBall = make_Sprite(BALL_SIZE, BALL_SIZE, SceneBatting.Ball.x, SceneBatting.Ball.y, 'img/ball_shadow.gif');
							BattedBall.timespeed =1.7;
							BattedBall.speed_x = batted_speed * Math.cos(angle * Math.PI/180);
							BattedBall.speed_y = batted_speed * Math.sin(angle * Math.PI/180);
							//打球の地面からの高さ
							BattedBall.h = 10;
							//打球が着地したらtrue
							BattedBall.stop_flag = false;
							//浮力
							BattedBall.buoyancy = 2  + batted_speed * 0.25 - (Math.sqrt(Math.pow((SceneBatting.Ball.y + BALL_SIZE/2) - (SceneBatting.MeetCursor.y + MEETCURSOR_SIZE_Y/2), 2)))/6;
							if(BattedBall.buoyancy < 0.5){
								BattedBall.buoyancy = 0.5;
							}
							//console.log('tate:'+(Math.sqrt(Math.pow((SceneBatting.Ball.y + BALL_SIZE/2) - (SceneBatting.MeetCursor.y + MEETCURSOR_SIZE_Y/2), 2)))/3);
							//console.log('buoyancy:'+BattedBall.buoyancy);
							//飛距離（得点）
							BattedBall.flown = 0;
							//フレーム処理
							BattedBall.addEventListener('enterframe', function(){
								if(SceneBatting.Camera.timestart){
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

											SceneBatting.LastBall.battedball_num--;

											//console.log('hit_se:'+hit_se);
											SceneBatting.Point.addition(parseInt(BattedBall.flown), hit_se); 
											SceneBatting.Point.update();
										
											setTimeout(function(){
												SceneBatting.Camera.removeChild(this);

												if(GameSet[Mode][Course]["nock"] == 0){
													SceneBatting.Pitcher.throw_flag = true;
												}
												if(SceneBatting.LastBall.num > 0){
													SceneBatting.Camera.speed = 12;
													SceneBatting.Camera.target_x = CAMERA_BATTING_X;
													SceneBatting.Camera.target_y = CAMERA_BATTING_Y;
												}
												//SceneBatting.Camera.removeChild(BattedBall);
												SceneBatting.LastBall.decrement();
											},2000);
										}else{
											//飛距離でスコア計算されるように修正
											this.flown += batted_speed * 0.05 * this.timespeed;
										}
										//カメラ追従
										if(GameSet[Mode][Course]["nock"] == 0 && this.y >= CAMERA_BATTING_Y && SceneBatting.Camera.timestop == 0){
											SceneBatting.Camera.speed = 2;
											//グラウンド最下部からある程度離れたらカメラ追従
											if(this.y <= GROUND_SIZE_Y - 150){
												SceneBatting.Camera.target_x = SceneBatting.Camera.target_x + this.speed_x * this.timespeed;
												SceneBatting.Camera.target_y = SceneBatting.Camera.target_y + this.speed_y * this.timespeed;							}
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

								if(SceneBatting.LastBall.num == SceneBatting.LastBall.max){
									SceneBatting.Camera.removeChild(this);
								}
							});
							var BattedBallHop = make_Sprite(BALL_SIZE*2, BALL_SIZE*2, SceneBatting.Ball.x-BALL_SIZE/2,	SceneBatting.Ball.y-BALL_SIZE/2, 'img/ball.gif');
							BattedBallHop.scaleX = 0.5 + BattedBall.h/400;
							BattedBallHop.scaleY = 0.5 + BattedBall.h/400;
							BattedBallHop.anime_frame = 0;
							BattedBallHop.anime_speed = 0;
							BattedBallHop.frame_num = SceneBatting.Ball.frame_num;
							BattedBallHop.addEventListener('enterframe', function(){
								if(SceneBatting.Camera.timestart && batted_speed > 0){
									BattedBallHop.x = parseInt(BattedBall.x  - BattedBall.speed_x * BattedBall.timespeed)  - BALL_SIZE/2;
									BattedBallHop.y = parseInt(BattedBall.y -BattedBall.speed_y * BattedBall.timespeed - BattedBall.h - BALL_SIZE + 5 );
									BattedBallHop.scaleX = 0.5 + BattedBall.h/400;
									BattedBallHop.scaleY = 0.5 + BattedBall.h/400;
									if(SceneBatting.LastBall.num == SceneBatting.LastBall.max){
										SceneBatting.Camera.removeChild(this);
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
									if(SceneBatting.Camera.timestart){
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
							SceneBatting.Camera.addChild(BattedBall);
							SceneBatting.Camera.addChild(BattedBallHop);

							BattedBall._element.style.zIndex = 2;
							BattedBallHop._element.style.zIndex = 2;
							if(GameSet[Mode][Course]["nock"] == 1){
								SceneBatting.Pitcher.throw_flag = true;
							}
						}
					}
					//移動 バッターの位置についていく
					SceneBatting.MeetCursor.x = SceneBatting.Batter.x + 110;
					SceneBatting.MeetCursor.y = SceneBatting.Batter.y + 60;
				}
			});
		
			//*エフェクト*
			SceneBatting.Effect = new Group();
			SceneBatting.Effect.add = function(effect_num, input_x , input_y){
				var EffectChild = new Sprite(0, 0);
				EffectChild.x = input_x;
				EffectChild.y = input_y;
				EffectChild.animation_frame = 0;
				SceneBatting.Effect.addChild(EffectChild);
				switch(effect_num){
					//集中線
					case 1:
						EffectChild.width = 480;
						EffectChild.height = 480;
						EffectChild.image = game.assets['img/effect_line.gif'];
						EffectChild.addEventListener('enterframe', function(){
							this.x = - SceneBatting.Camera.x;
							this.y = - SceneBatting.Camera.y;

							this.animation_frame++;
							if(this.animation_frame%2 == 1){
								this.visible = true;
							}else{
								this.visible = false;
							}
							if(this.animation_frame > 3){
								SceneBatting.Effect.removeChild(this);
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
								SceneBatting.Effect.removeChild(this);
							}
						});					
						break;
					}
			}

			//*カメラ*
			SceneBatting.Camera = new Group();
			SceneBatting.Camera.x = CAMERA_BATTING_X;
			SceneBatting.Camera.y = CAMERA_BATTING_Y + 2000; //2000:カメラ初期位置
			SceneBatting.Camera.target_x = CAMERA_BATTING_X; //カメラが向かう位置
			SceneBatting.Camera.target_y = CAMERA_BATTING_Y; //カメラが向かう位置
			SceneBatting.Camera.speed = 10; //目的に対する追従速度
			SceneBatting.Camera.timestop = 0; //時を止めるフレーム
			SceneBatting.Camera.timestart = true;
			SceneBatting.Camera.frame_test= 0;
			SceneBatting.Camera.reset = function(){
				SceneBatting.bgm_fadeout = false;
				game.assets[BattingBgmFile].volume = 0.4;
				SceneBatting.Camera.speed = 10;
				SceneBatting.Camera.target_x = CAMERA_BATTING_X;
				SceneBatting.Camera.target_y = CAMERA_BATTING_Y;
			}
			SceneBatting.Camera.addEventListener('enterframe', function(){	
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
						SceneBatting.Camera.x--;
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
			SceneBatting.Camera.addChild(SceneBatting.BackgroundBatting);
			SceneBatting.Camera.addChild(SceneBatting.MeetCursor);
			SceneBatting.Camera.addChild(SceneBatting.Pitcher);
			SceneBatting.Camera.addChild(SceneBatting.Batter);
			SceneBatting.Camera.addChild(SceneBatting.Effect);

			//add
			SceneBatting.addChild(SceneBatting.Camera);
			SceneBatting.addChild(SceneBatting.States);
			SceneBatting.addChild(SceneBatting.KeyPad);
			SceneBatting.addChild(SceneBatting.SwingButton);

			return SceneBatting;
		}
	
//******************
//リザルト画面
//****************
		
		function initResult(){
			//*リザルトシーン*
			var SceneResult = new Scene();
			SceneResult.animation_frame = 0;
			SceneResult.score_ball_num = 1;
			//リトライ=1, リセット=2
			SceneResult.select_menu = 0;
			SceneResult.addEventListener('leftbuttondown', function(){
				SceneResult.select_menu = 1;
				SceneResult.RetryButton.opacity = 0.8;
				SceneResult.ResetButton.opacity = 0.3;
			});
			SceneResult.addEventListener('rightbuttondown', function(){
				SceneResult.select_menu = 2;
				SceneResult.ResetButton.opacity = 0.8;
				SceneResult.RetryButton.opacity = 0.3;
			});
			//スペースを押したとき
			SceneResult.decide = function(){
				if(this.select_menu == 1){
					SceneResult.select_menu = 0;
					SceneResult.animation_frame = 0;
					SceneResult.score_ball_num = 1;
					SceneResult.BackgroundResult.opacity = 0;
					SceneBatting.Pitcher.throw_interval_count = -30; //初回
					if(SoundFlag == 1){
						game.assets[RESULT_BGM].stop();
						game.assets[RESULT_BGM].volume = 0;
						game.assets[BattingBgmFile].stop();
					}
					game.popScene(SceneResult);
					
					SceneTitle.StartButton.game_start();
					SceneBatting.Point.reset();
					SceneBatting.Camera.reset();
					SceneBatting.Point.update();

					for (var i =SceneResult.childNodes.length-1; i>=0; i--) {
						SceneResult.removeChild(SceneResult.childNodes[i]);
					}

					SceneResult.addChild(SceneResult.BackgroundResult);
					SceneResult.addChild(SceneResult.ResultTitle);
					SceneResult.addChild(SceneResult.ModeTitle);
					SceneResult.addChild(SceneResult.RetryButton);
					SceneResult.addChild(SceneResult.ResetButton);
					
					game.pushScene(SceneBatting);

					SceneBatting.Point.visible = true;
					SceneBatting.StateFrame.visible = true;
					SceneBatting.LastBall.visible = true;
				}
				if(this.select_menu == 2){
					//window.location.reload();
					if(SoundFlag == 1){
						game.assets[RESULT_BGM].stop();
						game.assets[RESULT_BGM].volume = 0;
						game.assets[BattingBgmFile].stop();
					}
					game.popScene(SceneResult);
					game.popScene(SceneBatting);
					initAll();
					game.pushScene(SceneTitle);
				}
			}

			SceneResult.addEventListener('enterframe', function(){
				this.animation_frame++;
				if(SceneResult.BackgroundResult.opacity < 0.7){
					SceneResult.BackgroundResult.opacity += 0.03;
				}
				if(this.animation_frame == 1){
					SceneResult.ResultTitle.opacity = 0;
					SceneResult.ModeTitle.opacity = 0;
				}
				if(this.animation_frame == 10){
					SceneResult.ResultTitle.text = "<div id=\"result_title\">結果発表</div>";
					SceneResult.ModeTitle.text = "<div id=\"mode_title\">" + GameSet[Mode][Course]["course_name"] + "</div>";
				}
				if(SceneResult.ResultTitle.opacity < 1){
					SceneResult.ResultTitle.opacity += 0.05;
				}

				if(SceneResult.ModeTitle.opacity < 1){
					SceneResult.ModeTitle.opacity += 0.05;
				}
				//100本モードとそれ以外のモードで結果表示を変化
				if(GameSet[Mode][Course]["nock"] == 1){
					if(this.animation_frame == 50){
						var MaxFlownHead = make_Label(120, 80, "result_type", "最高飛距離");
						SceneResult.addChild(MaxFlownHead);

						var MaxFlown = make_Label(240, 80, "result_score", SceneBatting.Point.max+"m");
						SceneResult.addChild(MaxFlown);

						play_se('sound/hit_1.wav');
					}

					if(this.animation_frame == 70){
						var SpuerHitHead = make_Label(120, 135, "result_type", "真芯ヒット数");
						SceneResult.addChild(SpuerHitHead);

						var SpuerHitNum = make_Label(240, 135, "result_score", SceneBatting.Point.justmeet+"回");
						SceneResult.addChild(SpuerHitNum);

						play_se('sound/hit_1.wav');
					}

					if(this.animation_frame == 90){
						var WhiffNumHead = make_Label(120, 190, "result_type", "空振り数");
						SceneResult.addChild(WhiffNumHead);

						var WhiffNum = make_Label(240, 190, "result_score", SceneBatting.Point.miss+"回");
						SceneResult.addChild(WhiffNum);

						play_se('sound/hit_1.wav');
					}

					if(this.animation_frame == 110){
						var TotalMeter = make_Label(120, 240, "result_total", "合計"+SceneBatting.Point.num+"m");
						SceneResult.addChild(TotalMeter);

						play_se('sound/hit_1.wav');
					}

					if(this.animation_frame == 130){

						if(checkClearRank(SceneBatting.Point.num)>0){
							var ClearText = make_Label(0, 275, "result_text", "ノルマクリア！");
							SceneResult.addChild(ClearText);
							
						}else{
							var ClearText = make_Label(0, 275+this.score_ball_num*20, "result_text", "もう一度挑戦しよう！")
							SceneResult.addChild(ClearText);
						}

						if(checkClearRank(SceneBatting.Point.num) == 2){
							var RankText = make_Label(0, 290+this.score_ball_num*20, "result_text", "★★");
							SceneResult.addChild(RankText);
							
						}

						if(checkClearRank(SceneBatting.Point.num) == 3){
							var RankText = make_Label(0, 290+this.score_ball_num*20, "result_text", "★★★");
							SceneResult.addChild(RankText);
							play_se('sound/hit_ex.wav');
						}else if(checkClearRank(SceneBatting.Point.num) > 0){
							play_se('sound/hit_1.wav');
						}

					}
				}else{
					if(this.animation_frame > 50){
						if(this.animation_frame %10 == 0 && this.score_ball_num <= SceneBatting.LastBall.max){
							//x球目
							var BallNum = make_Label(100, 60+this.score_ball_num*20, "result_num", this.score_ball_num+"球目");
							SceneResult.addChild(BallNum);
							//xメートル
							var Meter = make_Label(220, 60+this.score_ball_num*20, "result_score", SceneBatting.Point.ball[this.score_ball_num-1]['score']+"m");
							SceneResult.addChild(Meter);
							//空振りでなければヒット音を鳴らす
							if(SceneBatting.Point.ball[this.score_ball_num-1]['hit_se'] != -1){
								play_se(SceneBatting.Point.ball[this.score_ball_num-1]['hit_se']);						
							}
							this.score_ball_num++;
						}
					}
					if(this.animation_frame == 60 + SceneBatting.LastBall.max *10){
							var TotalMeter = make_Label(120, 70+this.score_ball_num*20, "result_total", "合計"+SceneBatting.Point.num+"m");
							SceneResult.addChild(TotalMeter);

							play_se('sound/hit_1.wav');
					}

					if(this.animation_frame == 80 + SceneBatting.LastBall.max *10){

						if(checkClearRank(SceneBatting.Point.num)>0){
							var ClearText = make_Label(0, 105+this.score_ball_num*20, "result_text", "ノルマクリア！");
							SceneResult.addChild(ClearText);
							
						}else{
							var ClearText = make_Label(0, 105+this.score_ball_num*20, "result_text", "もう一度挑戦しよう！")
							SceneResult.addChild(ClearText);
						}

						if(checkClearRank(SceneBatting.Point.num) == 2){
							var RankText = make_Label(0, 120+this.score_ball_num*20, "result_text", "★★");
							SceneResult.addChild(RankText);
						}

						if(checkClearRank(SceneBatting.Point.num) == 3){
							var RankText = make_Label(0, 120+this.score_ball_num*20, "result_text", "★★★");
							SceneResult.addChild(RankText);
							play_se('sound/hit_ex.wav');
						}else if(checkClearRank(SceneBatting.Point.num) > 0){
							play_se('sound/hit_1.wav');
						}

					}

				}
			});

			//*背景*
			SceneResult.BackgroundResult = new Sprite(SCREEN_SIZE_X, SCREEN_SIZE_Y);
			SceneResult.BackgroundResult.opacity = 0;
			SceneResult.BackgroundResult.backgroundColor = "black";

			//*得点*
			SceneResult.ResultTitle = make_Label(176, 10, "", "");
			SceneResult.ResultTitle.opacity = 0;
			SceneResult.ResultTitle.text = "";

			//*モード表示*
			SceneResult.ModeTitle = make_Label(0, 52, "", "");
			SceneResult.ModeTitle.opacity = 0;
			SceneResult.ModeTitle.text = "";

			//*リトライボタン
			SceneResult.RetryButton = make_Label(100, 410, "result_button", "もう一度");
			SceneResult.RetryButton.opacity = 0.3;
			SceneResult.RetryButton.addEventListener('touchstart', function (e) {
				SceneResult.select_menu = 1;
				SceneResult.RetryButton.opacity = 0.8;
				SceneResult.decide();
			});

			//*リセットボタン*
			SceneResult.ResetButton = make_Label(260, 410, "result_button", "メニューへ");
			SceneResult.ResetButton.opacity = 0.3;
			SceneResult.ResetButton.addEventListener('touchstart', function (e) {
				SceneResult.select_menu = 2;
				SceneResult.ResetButton.opacity = 0.8;
				SceneResult.decide();
			});

			//add
			SceneResult.addChild(SceneResult.BackgroundResult);
			SceneResult.addChild(SceneResult.ResultTitle);
			SceneResult.addChild(SceneResult.ModeTitle);
			SceneResult.addChild(SceneResult.RetryButton);
			SceneResult.addChild(SceneResult.ResetButton);

			function checkClearRank(total){
				if(total >= GameSet[Mode][Course]["norma_rank_third"]){
					return 3;
				}else if(total >= GameSet[Mode][Course]["norma_rank_second"]){
					return 2;
				}else if(total >= GameSet[Mode][Course]["norma_rank_first"]){
					return 1;
				}else{
					return 0;
				}
			}

			return SceneResult;
		}
//##########
//ゲーム管理
//##########
		game.addEventListener('spacebuttondown', get_space);

		var SceneTitle;
		var SceneHelp;
		var SceneRecord;
		var SceneBatting;
		var SceneResult;

		function initAll(){
			CommonCourse = createCommonCourse();
			ExtraCourse = createExtraCourse();
			SceneTitle = initTitle();
			SceneHelp = initHelp();
			SceneRecord = initRecord();
			SceneBatting = initBatting();
			SceneResult = initResult();
		}

		//すべてのシーンを設定
		initAll();

		//ゲームスタート
		game.pushScene(SceneTitle);
	};

	game.start();
};
