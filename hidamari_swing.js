enchant();

window.onload = function mogura() {
	var game = new Game(480, 480);
	game.keybind(32, "space");  // spaceキー
	game.preload(
		'img/background_title.jpg',
		'img/background_batting.jpg',
		'img/background_chase_ball.jpg',
		'img/pitcher.png',
		'img/batter.png',
		'img/meetcursor.png',
		'img/ball.png'
	);

	//game.preload('sound/screem.wav');

//****
//コンフィグ定数
//****
	var SCREENSIZE_Y = 480;
	var STARTBUTTON_X = 100;
	var STARTBUTTON_Y = 300;
	var BALL_NUM = 10;
	var PITCH_INTERVAL = 4;
	var LASTBALLNUMLABEL_X = 400;
	var LASTBALLNUMLABEL_Y = 10;
	var POINTLABEL_X = 400;
	var POINTLABEL_Y = 20;
	var PITCHER_X = 240-40;
	var PITCHER_Y = 50;
	var BATTER_DEFAULT_X = 100;
	var BATTER_DEFAULT_Y = 300;
	var BATTER_LIMIT_X = 25;
	var BATTER_LIMIT_Y = 40;
	var MEETCURSOR_DEFAULT_X = BATTER_DEFAULT_X + 120;
	var MEETCURSOR_DEFAULT_Y = BATTER_DEFAULT_Y + 50;
	var BALL_DEFAULT_X = PITCHER_X + 15;
	var BALL_DEFAULT_Y = PITCHER_Y + 50;


	game.onload = function () {
		var SceneTitle = new Scene(); //タイトル画面
		var SceneBatting = new Scene(); //バッティング画面
		var SceneChaseBall = new Scene(); //打球追跡画面
		var SceneResult = new Scene(); //リザルト画面

//*********************
//タイトル画面
//*******************
	//背景
		var BackgroundTitle = new Sprite(480,SCREENSIZE_Y);
		BackgroundTitle.image = game.assets['img/background_title.jpg'];

	//スタートボタン
		var StartButton = new Label();
		StartButton.x = STARTBUTTON_X;
		StartButton.y = STARTBUTTON_Y;
		StartButton.text = "<h1 class='button'>スタート</h1>";
		StartButton.addEventListener('touchstart', function (e) {
			game.popScene(SceneTitle);
			game.pushScene(SceneBatting);
		});

	//add
		SceneTitle.addChild(BackgroundTitle);
		SceneTitle.addChild(StartButton);

		

//*********************
//バッティング画面
//*********************
	//バッティング画面とボール追跡画面の共有変数
		var last_ball_num = BALL_NUM;
		var point = 0;
		
	//背景
		BackgroundBatting = new Sprite(480,SCREENSIZE_Y);
		BackgroundBatting.image = game.assets['img/background_batting.jpg'];

	//残り球数
		var LastBallNumLabel = new Label();
		LastBallNumLabel.x = LASTBALLNUMLABEL_X;
		LastBallNumLabel.y = LASTBALLNUMLABEL_Y;
		LastBallNumLabel.text = "<div class='label'>残り"+last_ball_num+"球</div>";

	//得点
		var PointLabel = new Label();
		PointLabel.x = POINTLABEL_X;
		PointLabel.y = POINTLABEL_Y;
		PointLabel.text = "<div class='label'>得点"+point+"点</div>";
		
	//ピッチャー
		var Pitcher = new Sprite(100, 100);
		Pitcher.x = PITCHER_X;
		Pitcher.y = PITCHER_Y;
		Pitcher.image = game.assets['img/pitcher.png'];
		//投げるflag
		throw_flag = true;
		//投球間隔カウント変数
		pitch_interval_time = 0;
		//フレーム処理
		Pitcher.addEventListener('enterframe', function(){
			if ( (throw_flag == true) && (game.frame % game.fps == 0) ) {
				pitch_interval_time++;
				if(pitch_interval_time == PITCH_INTERVAL){
					throw_flag = false;
					throw_ball();
					pitch_interval_time = 0;
				}
			}
		});

	//スペースが押されたとき呼ばれる関数（バッターとミートカーソルのswing関数を呼ぶ）
		function get_space(){
			Batter.swing();
			MeetCursor.swing();
		}

	//バッター
		var Batter = new Sprite(100, 100);
		Batter.x = BATTER_DEFAULT_X;
		Batter.y = BATTER_DEFAULT_Y;
		Batter.image = game.assets['img/batter.png'];
		//スイング（スペース押したときの）処理
		Batter.swing = function(){
			//（予定）スイングアニメーションを入れる
		}
		//フレーム処理
		Batter.addEventListener('enterframe', function(){
			if (game.input.up && Batter.y > BATTER_DEFAULT_Y-BATTER_LIMIT_Y){
				Batter.y = Batter.y - 1;
			}
			if (game.input.down && Batter.y < BATTER_DEFAULT_Y+BATTER_LIMIT_Y){
				Batter.y = Batter.y + 1;
			}
			if (game.input.left && Batter.x > BATTER_DEFAULT_X-BATTER_LIMIT_X){
				Batter.x = Batter.x - 1;
			}
			if (game.input.right && Batter.x < BATTER_DEFAULT_X+BATTER_LIMIT_X){
				Batter.x = Batter.x + 1;
			}
		});


	//ミートカーソル
		var MeetCursor = new Sprite(70, 50);
		MeetCursor.x = MEETCURSOR_DEFAULT_X;
		MeetCursor.y = MEETCURSOR_DEFAULT_Y;
		MeetCursor.image = game.assets['img/meetcursor.png'];
		//スイング（スペース押したときの）処理
		MeetCursor.swing = function(){
			if(MeetCursor.intersect(Ball)){
				console.log('hit');
			    hit_flag = true;
			    game.popScene(SceneBatting);
			    make_batted_ball(5);
				game.pushScene(SceneChaseBall);

			}
			else{
				console.log('スカ');
			}
		}
		MeetCursor.addEventListener('enterframe', function(){
			if (game.input.up && MeetCursor.y > MEETCURSOR_DEFAULT_Y-BATTER_LIMIT_Y){
				MeetCursor.y = MeetCursor.y - 1;
			}
			if (game.input.down && MeetCursor.y < MEETCURSOR_DEFAULT_Y+BATTER_LIMIT_Y){
				MeetCursor.y = MeetCursor.y + 1;
			}
			if (game.input.left && MeetCursor.x > MEETCURSOR_DEFAULT_X-BATTER_LIMIT_X){
				MeetCursor.x = MeetCursor.x - 1;
			}
			if (game.input.right && MeetCursor.x < MEETCURSOR_DEFAULT_X+BATTER_LIMIT_X){
				MeetCursor.x = MeetCursor.x + 1;
			}
		});

	//ボールとミートカーソル共有フラグ
		hit_flag = false;

	//投球
		var Ball = new Sprite(30, 30);
		Ball.x = BALL_DEFAULT_X;
		Ball.y = BALL_DEFAULT_Y;
		Ball.image = game.assets['img/ball.png'];
		//変化、コース用変数(デフォは0)
		Ball.direction_x = 0;
		Ball.direction_y = 0;
		Ball.speed_x = 0;
		Ball.speed_y = 0;
		//ボールの位置リセット、投球
		Ball.reset = function(){
			this.x = BALL_DEFAULT_X;
			this.y = BALL_DEFAULT_Y;
		}
		//コース、球種の設定関数
		Ball.change = function(template_num){
			//ここで変化とコースのコントロール
			if(template_num == 0){
				this.direction_y = 1;
				this.speed_y = 5;
			}
		}
		//ボールを消す、残り球数を減らす関数
		Ball.disapear = function(){
			SceneBatting.removeChild(this);
			last_ball_num = last_ball_num - 1;
			LastBallNumLabel.text = "<div class='label'>残り"+last_ball_num+"球</div>";
		}
		//フレーム処理
		Ball.addEventListener('enterframe', function(){
			if(hit_flag == true){
					this.disapear();
					//打球追跡画面に移行
			}
			else if(hit_flag == false){
				//投球進行
				this.y = this.y + this.direction_y*this.speed_y;
				if ( this.y == SCREENSIZE_Y ) {
					this.disapear();
					throw_flag = true;
				}
			}
		});
	
	//投球関数（引数で投球コース、スピードとか
		function throw_ball(){
			Ball.reset();
			Ball.change(0);
			console.log('throw')
			SceneBatting.addChild(Ball);
		};

	//add
		SceneBatting.addChild(BackgroundBatting);
		SceneBatting.addChild(LastBallNumLabel);
		SceneBatting.addChild(PointLabel);
		SceneBatting.addChild(Pitcher);
		SceneBatting.addChild(Batter);
		SceneBatting.addChild(MeetCursor);

//******************
//打球追跡画面
//****************
	//背景
		var BackgroundChaseBall = new Sprite(1440,1440);
		BackgroundChaseBall.image = game.assets['img/background_chase_ball.jpg'];

	//背景と打球をグループ化
		var Stadium = new Group();
		Stadium.x = -480;
		Stadium.y = -960;
		Stadium.addChild(BackgroundChaseBall);
	//打球生成関数
		//引数に必要そうなもの「落下点(飛距離)、スピード、方向」
		function make_batted_ball(speed){
			var BattedBall = new Sprite(30, 30);
			BattedBall.x = 720;
			BattedBall.y = 1400;
			BattedBall.image = game.assets['img/ball.png'];
			BattedBall.disapear = function(){
				SceneChaseBall.removeChild(this);
				last_ball_num = last_ball_num - 1;
				LastBallNumLabel.text = "<div class='label'>残り"+last_ball_num+"球</div>";
			}
			BattedBall.addEventListener('enterframe', function(){
				if(hit_flag == true && Stadium.y <= 0){
					BattedBall.y = BattedBall.y - speed;
					if ( this.y <= 1200 ) {
						Stadium.y = Stadium.y + speed;
					}
				}
				else{
					this.disapear();
					game.popScene(SceneChaseBall);
					hit_flag = false;
					throw_flag = true;
					game.pushScene(SceneBatting);

				}
			});
			Stadium.addChild(BattedBall);
		}

	//add
		SceneChaseBall.addChild(Stadium);

//******************
//リザルト画面
//****************


		game.addEventListener('spacebuttondown', get_space);
		game.pushScene(SceneTitle);
	};
	game.start();
};