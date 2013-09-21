enchant();

window.onload = function mogura() {
	var game = new Game(480, 480);
	game.keybind(32, "space");  // spaceキー
	game.preload(
		//Background
		'img/background_title.png',	'img/background_batting.jpg',
		//Charactor
		'img/logo.png',
		'img/direction.gif',
		'img/direction_n.gif',
		'img/switch.gif',
		'img/yuno.gif',
		'img/bat.gif',
		'img/miyako.gif',
		'img/meetcursor.png',
		'img/ball.gif',
		'img/ball_shadow.gif',
		'img/swing_button.png',
		'img/effect_line.gif',
		//BGM
		'sound/bgm_easy.mp3', 'sound/bgm_normal.mp3',
		'sound/bgm_hard.mp3', 'sound/bgm_extra1.mp3', 'sound/bgm_extra2.mp3',
		'sound/bgm_result.mp3',
		//SE
		'sound/hit_ex.wav',	'sound/hit_1.wav', 'sound/hit_2.wav', 'sound/hit_3.wav', 'sound/hit_4.wav'
	);
//**********
//コンフィグ定数
//**********
	//画面サイズ
	var SCREEN_SIZE_X = 480;
	var SCREEN_SIZE_Y = 480;
	//グラウンド全体サイズ
	var GROUND_SIZE_X = 2400;
	var GROUND_SIZE_Y = 1600;
	//スタートボタン位置
	var STARTBUTTON_X = 90;
	var STARTBUTTON_Y = 260;
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
	//残り球数
	var BALL_NUM = 10;
	var BALL_KNOCK_NUM = 100; //100本ノック
	//残り球数表示位置
	var LASTBALL_X = (CAMERA_BATTING_X * -1) + 400;
	var LASTBALL_Y = (CAMERA_BATTING_Y * -1) + 10;
	//得点表示位置
	var POINT_X = (CAMERA_BATTING_X * -1) + 400;
	var POINT_Y = (CAMERA_BATTING_Y * -1) + 20;
	//ピッチャー-サイズ
	var PITCHER_SIZE_X = 96;
	var PITCHER_SIZE_Y = 96;
	//ピッチャー-位置
	var PITCHER_X = (CAMERA_BATTING_X * -1) + SCREEN_SIZE_X/2 - PITCHER_SIZE_X/2 + 10;
	var PITCHER_Y = (CAMERA_BATTING_Y * -1) + SCREEN_SIZE_X/2 - PITCHER_SIZE_X/2 - 190;
	//ピッチャー-モーション数
	var PITCHER_MOTION_NUM = 10-1; //0,1,2,3,4,5,6,7,9
	//ピッチャー-投球間隔
	var PITCH_INTERVAL = 3; //4くらいがいいかも（デバック用に1）
	//バッター-サイズ
	var BATTER_SIZE_X = 128;
	var BATTER_SIZE_Y = 128;
	//バッター-デフォルト位置
	var BATTER_DEFAULT_X = (CAMERA_BATTING_X * -1) + SCREEN_SIZE_X/2 - PITCHER_SIZE_X/2 - 100;
	var BATTER_DEFAULT_Y = (CAMERA_BATTING_Y * -1) + SCREEN_SIZE_X/2 - PITCHER_SIZE_X/2 + 130;
	//バッターボックス制限
	var BATTER_LIMIT_X = 40;
	var BATTER_LIMIT_Y = 40;
	//ミートカーソル-サイズ
	var MEETCURSOR_SIZE_X = 64;
	var MEETCURSOR_SIZE_Y = 50;	
	//ミートカーソル-位置
	var MEETCURSOR_DEFAULT_X = BATTER_DEFAULT_X + 110;
	var MEETCURSOR_DEFAULT_Y = BATTER_DEFAULT_Y + 60;
	//ボール-サイズ
	var BALL_SIZE_X = 15;
	var BALL_SIZE_Y = 15;
	//ボール-投球直後のデフォルト位置
	var BALL_DEFAULT_X = PITCHER_X + PITCHER_SIZE_X/2 - BALL_SIZE_X/2 -5;
	var BALL_DEFAULT_Y = PITCHER_Y + 40;
	//十字パッド
	var PAD_X = (CAMERA_BATTING_X * -1);
	var PAD_Y = (CAMERA_BATTING_Y * -1) + SCREEN_SIZE_Y - 100;
	//スイングボタン-サイズ
	var SWINGBUTTON_SIZE_X = 80;
	var SWINGBUTTON_SIZE_Y = 80;
	//スイングボタン-位置
	var SWINGBUTTON_X = (CAMERA_BATTING_X * -1) + SCREEN_SIZE_X - SWINGBUTTON_SIZE_X;
	var SWINGBUTTON_Y = (CAMERA_BATTING_Y * -1) + SCREEN_SIZE_X - SWINGBUTTON_SIZE_Y;

	game.onload = function(){
		var GameMode = 0;
		var BattingBgmFile = '';

		//スペースが押されたとき呼ばれる関数ぶ）
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
		}

//*********************
//タイトル画面
//*******************
 	//*タイトルシーン*
		var SceneTitle = new Scene();
		//矢印キーによるモード選択
		SceneTitle.addEventListener('upbuttondown', function(){
			ModeSwitch.switching();
		});
		SceneTitle.addEventListener('downbuttondown', function(){
			ModeSwitch.switching();
		});
		SceneTitle.addEventListener('leftbuttondown', function(){
			StartButton.decrement();
			ModeLeftButton.img_update();
		});
		SceneTitle.addEventListener('rightbuttondown', function(){
			StartButton.increment();
			ModeRightButton.img_update();	
		});

	//*背景*
		var BackgroundTitle = new Sprite(SCREEN_SIZE_X, SCREEN_SIZE_Y);
		BackgroundTitle.image = game.assets['img/background_title.png'];

	//*ロゴ*
		var TitleLogo = new Sprite(332,200);
		TitleLogo.x = 50;
		TitleLogo.y = 20;
		TitleLogo.image = game.assets['img/logo.png'];
	
	//*スタートボタン*
		var StartButton = new Label();
		StartButton.num = 2;//デフォはNORMAL
		StartButton.x = STARTBUTTON_X;
		StartButton.y = STARTBUTTON_Y;
		StartButton.text = "<h1 class='button'>わくわくコース</h1>";
		StartButton.switching = function(){
			if(ModeSwitch.num == 1){
				StartButton.num = 4;
				StartButton.label_update();
				ModeLabel.text = "<div>エクストラモード</div>";
			}else{
				StartButton.num = 2;
				StartButton.label_update();
				ModeLabel.text = "<div>通常モード</div>";
			}
		};
		StartButton.decrement = function(){
			if((ModeSwitch.num == 0 && StartButton.num > 1) || (ModeSwitch.num == 1 && StartButton.num > 3)){
				console.log('decrement');
				StartButton.num--;
				StartButton.label_update();
			}
		};
		StartButton.increment = function(){
			if((ModeSwitch.num == 0 && StartButton.num < 2) || (ModeSwitch.num == 1 && StartButton.num < 5)){
				console.log('increment');
				StartButton.num++;
				StartButton.label_update();
			}
		};
		StartButton.label_update = function(){
			switch(StartButton.num){
				case 1:
					StartButton.text = "<h1 class='button'>ほのぼのコース</h1>";
					break;
				case 2:
					StartButton.text = "<h1 class='button'>わくわくコース</h1>";
					break;	
				case 3:
					StartButton.text = "<h1 class='button'>ゆのさま</h1>";
					break;
				case 4:
					StartButton.text = "<h1 class='button'>まっすぐコース</h1>";
					break;
				case 5:
					StartButton.text = "<h1 class='button'>100本ノック</h1>";
					break;
			}
		};
		StartButton.game_start = function(){
			switch(StartButton.num){
				case 1:
					GameMode = 1;
					BattingBgmFile = BATTING_BGM_EASY;
					break;
				case 2:
					GameMode = 2;
					BattingBgmFile = BATTING_BGM_NORMAL;
					break;
				case 3:
					GameMode = 3;
					BattingBgmFile = BATTING_BGM_HARD;
					break;
				case 4:
					GameMode = 4;
					BattingBgmFile = BATTING_BGM_EXTRA1;
					break;
				case 5:
					GameMode = 5;
					BattingBgmFile = BATTING_BGM_EXTRA2;
					LastBall.num =BALL_KNOCK_NUM;
					//LastBall.decrement();
					break;
			}
			var se = game.assets['sound/hit_1.wav'];
			se.play();
			game.popScene(SceneTitle);
			game.pushScene(SceneBatting);
		}
		StartButton.addEventListener('touchstart', function (e) {
			this.game_start();
		});

	//*矢印*
		var ModeLeftButton = new Sprite(DIRECTION_SIZE, DIRECTION_SIZE);
		ModeLeftButton.image = game.assets['img/direction.gif'];
		ModeLeftButton.x = 40;
		ModeLeftButton.y = STARTBUTTON_Y + DIRECTION_SIZE/2;
		ModeLeftButton.img_update = function(){
			if((ModeSwitch.num == 0 && StartButton.num == 1) || (ModeSwitch.num == 1 && StartButton.num == 3)){
				ModeLeftButton.image = game.assets['img/direction_n.gif'];//左押せない
			}
				ModeRightButton.image = game.assets['img/direction.gif'];//右復活
			
		}
		ModeLeftButton.addEventListener('touchstart', function (e) {
			StartButton.decrement();
			ModeLeftButton.img_update();
		});

		var ModeRightButton = new Sprite(DIRECTION_SIZE, DIRECTION_SIZE);
		ModeRightButton.image = game.assets['img/direction_n.gif'];
		ModeRightButton.x = SCREEN_SIZE_X - DIRECTION_SIZE - 40;
		ModeRightButton.y = STARTBUTTON_Y + DIRECTION_SIZE/2;
		ModeRightButton.rotation = 180;
		ModeRightButton.img_update = function(){
			if((ModeSwitch.num == 0 && StartButton.num == 2) || (ModeSwitch.num == 1 && StartButton.num == 5)){
				ModeRightButton.image = game.assets['img/direction_n.gif'];//右押せない
			}
				ModeLeftButton.image = game.assets['img/direction.gif'];//左復活
		}
		ModeRightButton.addEventListener('touchstart', function (e) {
			StartButton.increment();
			ModeRightButton.img_update();
		});

		var ModeSwitch = new Sprite(DIRECTION_SIZE, DIRECTION_SIZE);
		ModeSwitch.image = game.assets['img/switch.gif'];
		ModeSwitch.x = SCREEN_SIZE_X/2 - DIRECTION_SIZE/2 - STARTBUTTON_X/2;
		ModeSwitch.y = STARTBUTTON_Y - DIRECTION_SIZE/2 -10;
		ModeSwitch.num = 0; // 0 or 1
		ModeSwitch.switching = function(){
			if(ModeSwitch.num == 0){
				ModeSwitch.num = 1;
			}else{
				ModeSwitch.num = 0;
			}
			StartButton.switching();
			ModeLeftButton.img_update();
			ModeRightButton.img_update();
			console.log('ModeSwitch.num: '+ ModeSwitch.num);
			console.log('StartButton.num: '+ StartButton.num);
		}
		ModeSwitch.addEventListener('touchstart', function (e) {
			this.switching();
		});

	//*モードラベル*
		var ModeLabel = new Label();
		ModeLabel.x = SCREEN_SIZE_X/2 - DIRECTION_SIZE/2;
		ModeLabel.y = STARTBUTTON_Y - DIRECTION_SIZE/2 + 5;
		ModeLabel.text = "<div>通常モード</div>";

	//*モード説明*
		var ModeDiscription = new Label();
		ModeDiscription.x = STARTBUTTON_X;
		ModeDiscription.y = STARTBUTTON_Y+100;
		ModeDiscription.text = "<div>モード説明</div>";
		ModeDiscription.update = function(){

		}

	//*操作説明ボタン*
		var HelpButton = new Label();
		HelpButton.x = STARTBUTTON_X;
		HelpButton.y = STARTBUTTON_Y+130;
		HelpButton.text = "<h1 id='helpbutton' class='button'>操作説明</h1>";
		HelpButton.addEventListener('touchstart', function (e) {
			console.log('ヘルプ');
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

	//add
		SceneTitle.addChild(BackgroundTitle);
		SceneTitle.addChild(TitleLogo);
		SceneTitle.addChild(ModeLabel);
		SceneTitle.addChild(StartButton);
		SceneTitle.addChild(ModeLeftButton);
		SceneTitle.addChild(ModeRightButton);
		SceneTitle.addChild(ModeSwitch);
		SceneTitle.addChild(HelpButton);


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
			if(!SceneBatting.bgm_fadeout){
	            game.assets[BattingBgmFile].play();
    	        game.assets[BattingBgmFile].volume = 0.4;
			}
	    });

	//*背景*
		BackgroundBatting = new Sprite(GROUND_SIZE_X, GROUND_SIZE_Y);
		BackgroundBatting.image = game.assets['img/background_batting.jpg'];
		BackgroundBatting.x = 0;
		BackgroundBatting.y = -800;
		BackgroundBatting.scaleX = 2;
		BackgroundBatting.scaleY = 2;

	//*バーチャルキーパッド*
	    var KeyPad = new Pad();
	    KeyPad.x = PAD_X;
		KeyPad.y = PAD_Y;

	//*スイングボタン*
		var SwingButton = new Sprite(SWINGBUTTON_SIZE_X, SWINGBUTTON_SIZE_Y);
		SwingButton.image = game.assets['img/swing_button.png'];
		SwingButton.x = SWINGBUTTON_X;
		SwingButton.y = SWINGBUTTON_Y;
		// タッチ開始時処理
		SwingButton.ontouchstart = function() {
			get_space();
        };

	//*残り球数*
		var LastBall = new Label();
		LastBall.x = LASTBALL_X;
		LastBall.y = LASTBALL_Y;
		LastBall.num = BALL_NUM;
		LastBall.battedball_num = 0; //打球の数

		LastBall.text = "<div class='label'>残り"+LastBall.num+"球</div>";
		LastBall.decrement = function(){
			this.text = "<div class='label'>残り"+this.num+"球</div>";
			if(this.num == 0 && this.battedball_num == 0 && Pitcher.throw_flag == true){
				SceneBatting.bgm_fadeout = true;
				setTimeout(function(){
					game.pushScene(SceneResult);
					game.assets[RESULT_BGM].play();
					game.assets[RESULT_BGM].volume = 0.4;
				},3000);
			}
		}

	//*得点*
		var Point = new Label();
		Point.x = POINT_X;
		Point.y = POINT_Y;
		Point.num = 0;
		Point.ball =  new Array(); //ボール別のスコア
		Point.miss = 0; //空振り率
		Point.max = 0; //最高飛距離
		Point.super_hit = 0; //真芯率
		Point.text = "<div class='label'>合計"+Point.num+"m</div>";
		Point.addition = function(point, hit_se){
			this.num += point;
			Point.text = "<div class='label'>合計"+this.num+"m</div>";

			this.obj = new Object();
			this.obj['hit_se'] = hit_se;
			this.obj['score'] = point;

			this.ball.push(this.obj);

			//真芯カウントの追加
			if(hit_se == 0){
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

	//*投球（ミートカーソルのあたり判定用にここで変数定義）*
		var Ball;

	//*ピッチャー*
		var Pitcher = new Sprite(PITCHER_SIZE_X, PITCHER_SIZE_Y);
		Pitcher.x = PITCHER_X;
		Pitcher.y = PITCHER_Y;
		Pitcher.image = game.assets['img/yuno.gif'];
		Pitcher._element.style.zIndex = 2;

		//投げるflag
		Pitcher.throw_flag = true;
		//投球間隔カウント変数
		Pitcher.throw_interval_count = 0;
		//アニメーションフレーム
		Pitcher.frame = 0;
		//投球関数（引数で投球コース、スピードとか
		Pitcher.throw_ball = function(template_num){
			Ball = new Sprite(BALL_SIZE_X, BALL_SIZE_Y);
			Ball.image = game.assets['img/ball.gif'];
			Ball.x = BALL_DEFAULT_X;
			Ball.y = BALL_DEFAULT_Y;
			Ball._element.style.zIndex = 4;

			LastBall.num--;
			LastBall.decrement();

			//球種の数値は基本的に モード数×100+通し番号 とする イージーの1番目なら101 
			switch(template_num){
				case 0:
					//テンプレート呼ばない場合（超ランダムとか用に用意しとく、使わないかも）
					break;

				case　1: //デバック用 固定球
					Ball.speed_x = 0;
					Ball.speed_y = 0;

					Ball.x = MeetCursor.x + MEETCURSOR_SIZE_X/2 - 7.5;
					Ball.y = MeetCursor.y + MEETCURSOR_SIZE_Y/2 - 7.5;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){

					});
					break;

				//イージー用球種
				case　101: //イージーモード用ストレート 左右に少し角度がつく
					Ball.direction_x = (Math.random() - Math.random()) * 0.75;//1:右、-1:左
					Ball.direction_y = 1;//1:前、-1:後
					Ball.speed_x = 1;
					Ball.speed_y = 7 + Math.random() * 3;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.x = this.x + this.direction_x*this.speed_x;
						this.y = this.y + this.direction_y*this.speed_y;
						
					});
					break;

				//ノーマル用球種
				case　201: //ノーマルモード用 ストレート 左右に少し角度がつく
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

				case　202: //カーブとシンカー：弧を描く
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

				case　203: //ナックル：ぶれて見切りづらいボール
					Ball.speed_x = (Math.random() - Math.random()) * 0.8;
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

				case　204: //スローボール

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

				//ハード用球種
				case　301: //ハードモード用 ストレート 左右に少し角度がつく
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

				case　302: //オウルボール

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

				case　303: //チェンジアップ：スローボールの強化版

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

				case　304: //超ナックル：着弾までブレるボール
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

				case　305: //ティガーボール：消える魔球
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

				case　306: //超カーブ超シンカー：弧を描く
					Ball.carve = Math.random() * 2 + 13;

					if(parseInt(Math.random()*10)%2 == 1){
						Ball.carve *= -1;
					}
					Ball.speed_x = 	Ball.carve;
					Ball.speed_y = 13 + Math.random() * 3;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.speed_x -=  Ball.carve/13;
						this.x = this.x + this.speed_x;
						this.y = this.y + this.speed_y;
						
					});
					break;

				case　307: //ループシュート
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

				case　308: //収縮ショット
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
				case　401: //ストレート 左右に少し角度がつく
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

				//追加モードその2用球種
				case　501: //ストレート 左右に少し角度がつく
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

			}

			//空振り処理
			Ball.addEventListener('enterframe', function(){
				if ( this.y >= GROUND_SIZE_Y ) {
					Camera.removeChild(this);
					Pitcher.throw_flag = true;
					LastBall.decrement();
					Point.addition(0, -1); //空振りスコアの追加
				}
			});

			console.log('throw')
			Camera.addChild(Ball);
		};
		//フレーム処理
		Pitcher.addEventListener('enterframe', function(){
			if(Camera.timestart){
				if(this.throw_flag == true){
					//投球
					if((this.frame == 9) && (this.throw_interval_count == PITCH_INTERVAL)){
						this.throw_flag = false;
						this.throw_interval_count = 0;
						//球種を選定する
						//ストレートを設定
						this.ball_type = GameMode*100 + 1;

						//イージーモード
						if(GameMode == 1){

						//ノーマルモード
						}else if(GameMode == 2){
							//残り球数が奇数の時に変化球を混ぜる可能性を持たせる
							if(LastBall.num %2 == 1){
								this.ball_type += parseInt(Math.random()*10%4);
							}

						//ハードモード
						}else if(GameMode == 3){
							//常に変化球も投げる
							this.ball_type += parseInt(Math.random()*10%8);
						}

						//投球
						console.log('ball_type:' + this.ball_type);
						this.throw_ball(this.ball_type);
					}
					//投球モーション
					else if(this.throw_interval_count == PITCH_INTERVAL){
						if(game.frame % (game.fps/10) == 0){
			            	this.frame++;
			        	}
					}
					//インターバルカウント
					else if ((this.frame < 9) && (LastBall.num > 0)) {

						if(GameMode == 5 && LastBall.num != BALL_KNOCK_NUM){
							this.throw_interval_count = PITCH_INTERVAL;
						}

						if((game.frame % game.fps) == 0){
							this.throw_interval_count++;
							console.log(this.throw_interval_count);//for debug
						}

					}
					//セットモーション
					else if((this.frame >= 9) && (this.throw_interval_count == 0)){

						if(GameMode == 5 && LastBall.num > 0){
							this.frame = 3;
						}

						if(game.frame % (game.fps/10) == 0){
							console.log(this.frame);//for debug
			            	if(this.frame == 11){
			            		this.frame = 0;
			            	}else{
				            	this.frame++;
							}
			        	}
					}

				}

			}
		});
		

	//*バット*
		var Bat = new Sprite(96,32);
		Bat.x = BATTER_DEFAULT_X + BATTER_SIZE_X/2 + 10;
		Bat.y = BATTER_DEFAULT_Y + BATTER_SIZE_Y/2;
		Bat.swing_frame = 0; //スイングした時のフレームカウント
		Bat._element.style.zIndex = 3;
		Bat.image = game.assets['img/bat.gif'];
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
					if(Pitcher.throw_flag == false && this.swing_frame > 10 && GameMode != 5){
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
		var Batter = new Sprite(BATTER_SIZE_X, BATTER_SIZE_Y);
		Batter.x = BATTER_DEFAULT_X;
		Batter.y = BATTER_DEFAULT_Y;
		Batter.image = game.assets['img/miyako.gif'];
		Batter.frame = 0;
		Batter.swing_flag = true;
		Batter._element.style.zIndex = 3;
		//スイング（スペース押したときの）処理
		Batter.swing = function(){
			console.log('swing'); //for debug
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
		});

	//*ミートカーソル*
		var MeetCursor = new Sprite(MEETCURSOR_SIZE_X, MEETCURSOR_SIZE_Y);
		MeetCursor.x = MEETCURSOR_DEFAULT_X;
		MeetCursor.y = MEETCURSOR_DEFAULT_Y;
		MeetCursor.image = game.assets['img/meetcursor.png'];
		//ヒットフラグ
		MeetCursor.hit_flag = false;
		//フレーム処理
		MeetCursor.addEventListener('enterframe', function(){
			if(Camera.timestart){
				if(Pitcher.throw_flag == false){
					if(MeetCursor.intersect(Ball) && Bat.swing_frame == 3){

						LastBall.battedball_num++;

						if(GameMode != 5){
							LastBall.visible = false;
							Point.visible = false;
						}

						Camera.removeChild(Ball);
						console.log('hit'); //for debag
						MeetCursor.hit_flag = false;
					    //打球角度
					    var angle = 90 - ((Ball.y + BALL_SIZE_Y/2) - (MeetCursor.y + MEETCURSOR_SIZE_Y/2)) * 2.5 * -1;
					    console.log('angle:'+angle);//for debug
					    //ミートカーソルとボールの距離計算
					    var distance = Math.sqrt(Math.pow((Ball.x + BALL_SIZE_X/2) - (MeetCursor.x + MEETCURSOR_SIZE_X/2), 2) + Math.pow((Ball.y + BALL_SIZE_Y/2) - (MeetCursor.y + MEETCURSOR_SIZE_Y/2), 2) * 0.6);
						console.log('distance:'+distance);//for debug
					    //真芯値
					    var meetpoint = 32;
					    //打球スピード
					    var batted_speed = (meetpoint - distance)* 0.7;

						//真芯演出
						if(batted_speed > 19.5){
							Camera.timestop = 10;
							console.log(CAMERA_BATTING_X);
							Effect.add(1, - CAMERA_BATTING_X ,  - CAMERA_BATTING_Y)
						}

						if(batted_speed < 3){
							batted_speed = 3;	
					    }
							
						var hit_se = 0;
						if(batted_speed > 19.5){
							var se = game.assets['sound/hit_ex.wav'];
							se.play();
							hit_se = 0;
						}else if(batted_speed>14){
							var se = game.assets['sound/hit_1.wav'];
							se.play();
							hit_se = 1;
						}else if(batted_speed > 10){
							var se = game.assets['sound/hit_2.wav'];
							se.play();
							hit_se = 2;
						}else if(batted_speed > 6){
							var se = game.assets['sound/hit_3.wav'];
							se.play();
							hit_se = 3;
						}else if(batted_speed > 0){
							var se = game.assets['sound/hit_4.wav'];
							se.play();
							hit_se = 4;
						}
					    console.log('batted_speed:'+batted_speed);//for debug
					//*打球*
						var BattedBall = new Sprite(BALL_SIZE_X, BALL_SIZE_Y);
						BattedBall.x = Ball.x;
						BattedBall.y = Ball.y;			
						BattedBall.image = game.assets['img/ball_shadow.gif'];
						BattedBall.speed_x = batted_speed * Math.cos(angle * Math.PI/180);
						BattedBall.speed_y = batted_speed * Math.sin(angle * Math.PI/180);
						//打球の地面からの高さ
						BattedBall.h = 10;
						//打球が着地したらtrue
						BattedBall.stop_flag = false;
						//浮力
						BattedBall.buoyancy = 2  + batted_speed * 0.25 - (Math.sqrt(Math.pow((Ball.y + BALL_SIZE_Y/2) - (MeetCursor.y + MEETCURSOR_SIZE_Y/2), 2)))/6;
						if(BattedBall.buoyancy < 0.5){
							BattedBall.buoyancy = 0.5;
						}
						console.log('tate:'+(Math.sqrt(Math.pow((Ball.y + BALL_SIZE_Y/2) - (MeetCursor.y + MEETCURSOR_SIZE_Y/2), 2)))/3);
						console.log('buoyancy:'+BattedBall.buoyancy);
						//飛距離（得点）
						BattedBall.flown = 0;
						//フレーム処理
						BattedBall.addEventListener('enterframe', function(){
							if(Camera.timestart){
								this.x = this.x - this.speed_x;
								this.y = this.y - this.speed_y;
								this.h =  this.h + this.buoyancy;

								if(batted_speed > 0){
									this.buoyancy -= 0.1;
								}
								if(this.stop_flag == false){
									if(this.h <= 0){
										console.log('落下');
										BattedBall._element.style.zIndex = 1;
										BattedBallHop._element.style.zIndex = 1;
										this.stop_flag = true;

										LastBall.battedball_num--;

									//*取得点*
										if(GameMode != 5){
											var NowPoint = new Label();
											NowPoint.x = (Camera.x * -1) + SCREEN_SIZE_X/2;
											NowPoint.y = (Camera.y * -1) + SCREEN_SIZE_Y/2;
											console.log(NowPoint.x);
											NowPoint.text = "<h1 class='label'>飛距離:"+parseInt(BattedBall.flown)+"m</h1>";
											Camera.addChild(NowPoint);
										}

										setTimeout(function(){
											Camera.removeChild(this);
											Camera.removeChild(NowPoint);

											if(GameMode != 5){
												Pitcher.throw_flag = true;
											}
											console.log('hit_se'+hit_se);
											Point.addition(parseInt(BattedBall.flown), hit_se); 
											LastBall.visible = true;
											Point.visible = true;

											if(LastBall.num > 0){
												Camera.speed = 12;
												Camera.target_x = CAMERA_BATTING_X;
												Camera.target_y = CAMERA_BATTING_Y;
											}
											//Camera.removeChild(BattedBall);
											LastBall.decrement();
										},3000);
									}else{
										//飛距離でスコア計算されるように修正
										this.flown += batted_speed * 0.05;
									}
									//カメラ追従
									if(GameMode != 5 && this.y >= CAMERA_BATTING_Y){
										Camera.speed = 4;
										Camera.target_x = Camera.target_x + this.speed_x;
										Camera.target_y = Camera.target_y + this.speed_y;
									}

								}
								if(this.h <= 0 && this.buoyancy <= 0){
									this.buoyancy *= -0.25;
									if(parseInt(this.bouyancy) > -1){
										this.bouyancy =0;
									}
									this.h = 0;
									batted_speed *= 0.6;
									
									if(batted_speed < 0.5){
										batted_speed = 0;
										this.buoyancy = 0;
									}
									
									BattedBall.speed_x = batted_speed * Math.cos(angle * Math.PI/180);
									BattedBall.speed_y = batted_speed * Math.sin(angle * Math.PI/180);
								}
							}
						});

						var BattedBallHop = new Sprite(BALL_SIZE_X, BALL_SIZE_Y);
						BattedBallHop.image = game.assets['img/ball.gif'];
						BattedBallHop.x = Ball.x;
						BattedBallHop.y = Ball.y;
						BattedBallHop.addEventListener('enterframe', function(){
							if(Camera.timestart){
								BattedBallHop.x = parseInt(BattedBall.x  - BattedBall.speed_x);
								BattedBallHop.y = parseInt(BattedBall.y -BattedBall.speed_y- BattedBall.h - BALL_SIZE_Y/3);

							}
						});
						Camera.addChild(BattedBall);
						Camera.addChild(BattedBallHop);
						BattedBall._element.style.zIndex = 2;
						BattedBallHop._element.style.zIndex = 2;

						if(GameMode == 5){
							Pitcher.throw_flag = true;

						}


				    }else if(MeetCursor.hit_flag == true){
						console.log('スカ');
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
				}
		}

	//*カメラ*
		var Camera = new Group();
		Camera.x = CAMERA_BATTING_X;
		Camera.y = CAMERA_BATTING_Y + 2000; //2000:グイーン用
		Camera.target_x = CAMERA_BATTING_X; //カメラが向かう位置
		Camera.target_y = CAMERA_BATTING_Y; //カメラが向かう位置
		Camera.addChild(BackgroundBatting);
		Camera.addChild(LastBall);
		Camera.addChild(Point);
		Camera.addChild(MeetCursor);
		Camera.addChild(Pitcher);
		Camera.addChild(Batter);
		Camera.addChild(KeyPad);
		Camera.addChild(SwingButton);
		Camera.addChild(Effect);

		Camera.speed = 5; //目的に対する追従速度

		Camera.timestop_frame = 0; //時を止めるフレーム
		Camera.timestart = true;

		Camera.frame_test= 0;
		Camera.addEventListener('enterframe', function(){	
			if(this.timestop > 0){
				this.timestop--;
				this.timestart = false;
			}else{
				this.timestart = true;
			}
			
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

			if(SceneBatting.bgm_fadeout&& game.assets[BattingBgmFile].volume > 0){
				game.assets[BattingBgmFile].volume -= 0.005;
				if(game.assets[BattingBgmFile].volume < 0.01){
					game.assets[BattingBgmFile].volume = 0;
				}
			}

		});

	//add
		SceneBatting.addChild(Camera);
	
//******************
//リザルト画面
//****************
	//*リザルトシーン*
		var SceneResult = new Scene();

	//*背景*
		var BackgroundResult = new Sprite(SCREEN_SIZE_X, SCREEN_SIZE_Y);
		BackgroundResult.opacity = 0;
		BackgroundResult.backgroundColor = "black";

	//*得点*
		var ResultTitle = new Label();
		ResultTitle.x = 180;
		ResultTitle.y = 20;
		ResultTitle.opacity = 0;
		ResultTitle.text = "";

	//add
		SceneResult.addChild(BackgroundResult);
		SceneResult.addChild(ResultTitle);
		
		SceneResult.animation_frame = 0;
		SceneResult.score_ball_num = 1;
		SceneResult.addEventListener('enterframe', function(){
			this.animation_frame++;
			if(BackgroundResult.opacity < 0.7){
				BackgroundResult.opacity += 0.03;
			}


				if(this.animation_frame == 10){
					ResultTitle.text = "<div id=\"result_title\">結果発表</div>";
				}
				if(ResultTitle.opacity < 1){
					ResultTitle.opacity += 0.05;
				}

			if(GameMode != 5){


				if(this.animation_frame > 50){
					if(this.animation_frame %10 == 0 && this.score_ball_num < 11){
						var ResultBallNum = new Label();
						ResultBallNum.x = 100;
						ResultBallNum.y = 60 + this.score_ball_num*20;
						ResultBallNum.text = "<div class=\"result_num\">"+this.score_ball_num+"球目</div>";
						SceneResult.addChild(ResultBallNum);
						var ResultBallNum = new Label();
						ResultBallNum.x = 220;
						ResultBallNum.y = 60 + this.score_ball_num*20;
						ResultBallNum.text = "<div class=\"result_score\">"+Point.ball[this.score_ball_num-1]['score']+"m</div>";
						SceneResult.addChild(ResultBallNum);				
						console.log(Point.ball[this.score_ball_num-1]['hit_se']);
						switch(Point.ball[this.score_ball_num-1]['hit_se']){
							case 0:
								var se = game.assets['sound/hit_ex.wav'];
								se.stop();
								se.play();
								break;
							case 1:
								var se = game.assets['sound/hit_1.wav'];
								se.stop();
								se.play();
								break;
							case 2:
								var se = game.assets['sound/hit_2.wav'];
								se.stop();
								se.play();
								break;
							case 3:
								var se = game.assets['sound/hit_3.wav'];
								se.stop();
								se.play();
								break;
							case 4:
								var se = game.assets['sound/hit_4.wav'];
								se.stop();
								se.play();
								break;
						}
						this.score_ball_num++;
					}
				}

				if(this.animation_frame == 160){
						var ResultBallNum = new Label();
						ResultBallNum.x = 120;
						ResultBallNum.y = 70 + this.score_ball_num*20;
						ResultBallNum.text = "<div class=\"result_all\">合計"+Point.num+"m</div>";
						SceneResult.addChild(ResultBallNum);
						var se = game.assets['sound/hit_1.wav'];
						se.stop();
						se.play();
				}
			}

			if(GameMode == 5){
				if(this.animation_frame == 50){
					var ResultBallNum = new Label();
					ResultBallNum.x = 120;
					ResultBallNum.y = 70;
					ResultBallNum.text = "<div class=\"result_type\">最高飛距離</div>";
					SceneResult.addChild(ResultBallNum);

					var ResultBallNum = new Label();
					ResultBallNum.x = 240;
					ResultBallNum.y = 70;
					ResultBallNum.text = "<div class=\"result_score\">"+Point.max+"m</div>";
					SceneResult.addChild(ResultBallNum);

					var se = game.assets['sound/hit_1.wav'];
					se.stop();
					se.play();
				}

				if(this.animation_frame == 70){
					var ResultBallNum = new Label();
					ResultBallNum.x = 120;
					ResultBallNum.y = 125;
					ResultBallNum.text = "<div class=\"result_type\">真芯ヒット</div>";
					SceneResult.addChild(ResultBallNum);

					var ResultBallNum = new Label();
					ResultBallNum.x = 240;
					ResultBallNum.y = 125;
					ResultBallNum.text = "<div class=\"result_score\">"+Point.super_hit+"回</div>";
					SceneResult.addChild(ResultBallNum);

					var se = game.assets['sound/hit_1.wav'];
					se.stop();
					se.play();
				}

				if(this.animation_frame == 90){
					var ResultBallNum = new Label();
					ResultBallNum.x = 120;
					ResultBallNum.y = 180;
					ResultBallNum.text = "<div class=\"result_type\">空振り</div>";
					SceneResult.addChild(ResultBallNum);

					var ResultBallNum = new Label();
					ResultBallNum.x = 240;
					ResultBallNum.y = 180;
					ResultBallNum.text = "<div class=\"result_score\">"+Point.miss+"回</div>";
					SceneResult.addChild(ResultBallNum);

					var se = game.assets['sound/hit_1.wav'];
					se.stop();
					se.play();
				}


				if(this.animation_frame == 110){
					var ResultBallNum = new Label();
					ResultBallNum.x = 120;
					ResultBallNum.y = 230;
					ResultBallNum.text = "<div class=\"result_all\">合計"+Point.num+"m</div>";
					SceneResult.addChild(ResultBallNum);
					var se = game.assets['sound/hit_1.wav'];
					se.stop();
					se.play();
				}
			}


		});

//##########
//ゲーム管理
//##########
		game.addEventListener('spacebuttondown', get_space);
		game.pushScene(SceneTitle);

	};
	game.start();
};
