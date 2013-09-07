enchant();

window.onload = function mogura() {
	var game = new Game(480, 480);
	game.keybind(32, "space");  // spaceキー
	game.preload(
		'img/background_title.jpg',
		'img/background_batting.jpg',
		//'img/pitcher.gif',
		'img/yuno.gif',
		'img/batter.png',
		'img/meetcursor.png',
		'img/ball.png'
	);

//**********
//コンフィグ定数（モード別にするならここをいじる）
//**********
	//画面サイズ
	var SCREEN_SIZE_X = 480;
	var SCREEN_SIZE_Y = 480;
	//グラウンド全体サイズ
	var GROUND_SIZE_X = 2400;
	var GROUND_SIZE_Y = 2400;
	//タイトル画面-スタートボタン位置
	var STARTBUTTON_X = 100;
	var STARTBUTTON_Y = 300;
	//バッティング画面-デフォルトカメラ位置
	var CAMERA_BATTING_X = -(GROUND_SIZE_X/2 - SCREEN_SIZE_X/2);
	var CAMERA_BATTING_Y = -(GROUND_SIZE_Y - SCREEN_SIZE_Y);
	//残り球数
	var BALL_NUM = 10;
	//残り球数表示位置
	var LASTBALL_X = (CAMERA_BATTING_X * -1) + 400;
	var LASTBALL_Y = (CAMERA_BATTING_Y * -1) + 10;
	//得点表示位置
	var POINTLABEL_X = (CAMERA_BATTING_X * -1) + 400;
	var POINTLABEL_Y = (CAMERA_BATTING_Y * -1) + 20;
	//ピッチャー-サイズ
	var PITCHER_SIZE_X = 96;
	var PITCHER_SIZE_Y = 96;
	//ピッチャー-位置
	var PITCHER_X = (CAMERA_BATTING_X * -1) + SCREEN_SIZE_X/2 - PITCHER_SIZE_X/2;
	var PITCHER_Y = (CAMERA_BATTING_Y * -1) + SCREEN_SIZE_X/2 - PITCHER_SIZE_X/2 - 150;
	//ピッチャー-モーション数
	var PITCHER_MOTION_NUM = 10-1; //0,1,2,3,4,5,6,7,9
	//ピッチャー-投球間隔
	var PITCH_INTERVAL = 3; //4くらいがいいかも（デバック用に1）
	//バッター-デフォルト位置
	var BATTER_DEFAULT_X = (CAMERA_BATTING_X * -1) + SCREEN_SIZE_X/2 - PITCHER_SIZE_X/2 - 100;
	var BATTER_DEFAULT_Y = (CAMERA_BATTING_Y * -1) + SCREEN_SIZE_X/2 - PITCHER_SIZE_X/2 + 130;
	//バッターボックス制限
	var BATTER_LIMIT_X = 25;
	var BATTER_LIMIT_Y = 40;
	//ミートカーソル-位置
	var MEETCURSOR_DEFAULT_X = BATTER_DEFAULT_X + 120;
	var MEETCURSOR_DEFAULT_Y = BATTER_DEFAULT_Y + 50;
	//ボール-サイズ
	var BALL_SIZE_X = 30;
	var BALL_SIZE_Y = 30;
	//ボール-投球直後のデフォルト位置
	var BALL_DEFAULT_X = PITCHER_X + PITCHER_SIZE_X/2 - BALL_SIZE_X/2;
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
		var BackgroundTitle = new Sprite(480,SCREEN_SIZE_Y);
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
		//var last_ball_num = BALL_NUM;
		var point = 0;

	//スペースが押されたとき呼ばれる関数（バッターとミートカーソルのswing関数を呼ぶ）
		function get_space(){
			Batter.swing();
			MeetCursor.swing();
		}

	//残り球数
		var LastBall = new Label();
		LastBall.x = LASTBALL_X;
		LastBall.y = LASTBALL_Y;
		LastBall.num = BALL_NUM;
		LastBall.text = "<div class='label'>残り"+LastBall.num+"球</div>";
		LastBall.decrement = function(){
			this.num--;
			this.text = "<div class='label'>残り"+this.num+"球</div>";
			if(this.num == 0){
				game.popScene(SceneBatting);
				game.pushScene(SceneResult);
			}
		}

	//得点
		var PointLabel = new Label();
		PointLabel.x = POINTLABEL_X;
		PointLabel.y = POINTLABEL_Y;
		PointLabel.text = "<div class='label'>得点"+point+"点</div>";

	//背景
		BackgroundBatting = new Sprite(GROUND_SIZE_X,GROUND_SIZE_Y);
		BackgroundBatting.image = game.assets['img/background_batting.jpg'];
		BackgroundBatting.x = 0;
		BackgroundBatting.y = 0;
		//BackgroundBatting.x = CAMERA_BATTING_X;
		//BackgroundBatting.y = CAMERA_BATTING_Y;
	
	//投球（ミートカーソルのあたり判定用にここで変数定義）
	var Ball;

	//ピッチャー
		var Pitcher = new Sprite(PITCHER_SIZE_X, PITCHER_SIZE_Y);
		Pitcher.x = PITCHER_X;
		Pitcher.y = PITCHER_Y;
		Pitcher.image = game.assets['img/yuno.gif'];
		//Pitcher.image = game.assets['img/pitcher.gif'];
		//投げるflag
		throw_flag = true;
		//投球間隔カウント変数
		Pitcher.throw_interval_count = 0;
		//アニメーションフレーム
		Pitcher.frame = 0;
		//投球関数（引数で投球コース、スピードとか
		Pitcher.throw_ball = function(template_num){
			Ball = new Sprite(30, 30);
			Ball.image = game.assets['img/ball.png'];
			Ball.x = BALL_DEFAULT_X;
			Ball.y = BALL_DEFAULT_Y;

			switch(template_num){
				case 0:
					//テンプレート呼ばない場合（超ランダムとか用に用意しとく、使わないかも）
					break;
				case　1: //デバック用、ど真ん中ストレート
					//投球（ミートカーソルの判定用にここで定義、詳細はthrow_ballの中で設定）
					Ball.direction_x = 1;//1:右、-1:左
					Ball.direction_y = 1;//1:前、-1:後
					Ball.speed_x = 0;
					Ball.speed_y = 10;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.y = this.y + this.direction_y*this.speed_y;
						if ( this.y >= GROUND_SIZE_Y-15 ) {
							Camera.removeChild(this);
							throw_flag = true;
							LastBall.decrement();
						}
					});
					break;
			}
			console.log('throw')
			Camera.addChild(Ball);
		};
		//フレーム処理
		Pitcher.addEventListener('enterframe', function(){
			if(throw_flag == true){
				//投球
				if((this.frame == 9) && (this.throw_interval_count == PITCH_INTERVAL)){
					throw_flag = false;
					this.throw_interval_count = 0;
					//(予定)ここで球種、コース選定する
					this.throw_ball(1);
				}
				//投球モーション
				else if(this.throw_interval_count == PITCH_INTERVAL){
					if(game.frame % (game.fps/10) == 0){
		            	this.frame++;
		        	}
				}
				//インターバルカウント
				else if ((this.frame < 9)) {
					if((game.frame % game.fps) == 0){
						this.throw_interval_count++;
						console.log(this.throw_interval_count);//for debug
					}
				}
				//セットモーション
				else if((this.frame >= 9) && (this.throw_interval_count == 0)){
					if(game.frame % (game.fps/10) == 0){
						console.log(this.frame)//for debug
		            	if(this.frame == 11){
		            		this.frame = 0;
		            	}else{
			            	this.frame++;
						}
		        	}
				}
			}
		});

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
				console.log('hit'); //for debag
			    hit_flag = true;
			    //こいつを工夫して打球生成
			    make_batted_ball(Ball.x, Ball.y, 1, 20);
			}else{
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

	//カメラ
		var Camera = new Group();
		Camera.x = CAMERA_BATTING_X;
		Camera.y = CAMERA_BATTING_Y;
		Camera.addChild(BackgroundBatting);
		Camera.addChild(LastBall);
		Camera.addChild(PointLabel);
		Camera.addChild(Pitcher);
		Camera.addChild(Batter);
		Camera.addChild(MeetCursor);

	//ボールとミートカーソル共有フラグ
		hit_flag = false;		
	
	//add
		SceneBatting.addChild(Camera);


	//打球生成関数
		//引数に必要そうなもの「落下点(飛距離)、スピード、方向」
		function make_batted_ball(start_x, start_y, core_value, speed){
			//var speed_x;
			//var speed_y;
			var BattedBall = new Sprite(30, 30);
			BattedBall.x = start_x;
			BattedBall.y = start_y;
			BattedBall.image = game.assets['img/ball.png'];
			BattedBall.disapear = function(){
				SceneChaseBall.removeChild(this);
				last_ball_num = last_ball_num - 1;
				LastBall.text = "<div class='label'>残り"+last_ball_num+"球</div>";
			}
			BattedBall.addEventListener('enterframe', function(){
				this.y = this.y - speed;
				if(this.y >= CAMERA_BATTING_Y){
					Camera.y = Camera.y + speed;
				}
			});
			Camera.addChild(BattedBall);
		}

//******************
//リザルト画面
//****************
	//背景
		var BackgroundResult = new Sprite(SCREEN_SIZE_X, SCREEN_SIZE_Y);
		BackgroundResult.image = game.assets['img/background_title.jpg'];

	//得点
		var ResultPointLabel = new Label();
		ResultPointLabel.x = 240;
		ResultPointLabel.y = 240;
		ResultPointLabel.text = "<h1>得点"+point+"点</h1>";

	//add
		SceneResult.addChild(BackgroundResult);
		SceneResult.addChild(ResultPointLabel);



		game.addEventListener('spacebuttondown', get_space);
		game.pushScene(SceneTitle);
	};
	game.start();
};