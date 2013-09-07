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

	//var YUNO_MOTION = [0,1,2,3,4,5,6,7,8,9,10,11];
	//game.preload('sound/screem.wav');

//****
//コンフィグ定数
//****
	var SCREENSIZE_X = 480;
	var SCREENSIZE_Y = 480;
	var GROUNDSIZE_X = 2400;
	var GROUNDSIZE_Y = 2400;
	var CAMERA_BATTING_X = -(GROUNDSIZE_X/2-SCREENSIZE_X/2);
	var CAMERA_BATTING_Y = -(GROUNDSIZE_Y-SCREENSIZE_Y);
	var STARTBUTTON_X = 100;
	var STARTBUTTON_Y = 300;
	var BALL_NUM = 10;
	var PITCH_INTERVAL = 1; //4くらいがいいかも（デバック用に1）
	var LASTBALLNUMLABEL_X = 400;
	var LASTBALLNUMLABEL_Y = 10;
	var POINTLABEL_X = 400;
	var POINTLABEL_Y = 20;
	var PITCHERSIZE_X = 96;
	var PITCHERSIZE_Y = 96;
	var PITCHER_X = (CAMERA_BATTING_X*-1)+SCREENSIZE_X/2-PITCHERSIZE_X/2;
	var PITCHER_Y = (CAMERA_BATTING_Y*-1)+SCREENSIZE_X/2-PITCHERSIZE_X/2-150;
	var BATTER_DEFAULT_X = (CAMERA_BATTING_X*-1)+SCREENSIZE_X/2-PITCHERSIZE_X/2-100;
	var BATTER_DEFAULT_Y = (CAMERA_BATTING_Y*-1)+SCREENSIZE_X/2-PITCHERSIZE_X/2+130;
	var BATTER_LIMIT_X = 25;
	var BATTER_LIMIT_Y = 40;
	var MEETCURSOR_DEFAULT_X = BATTER_DEFAULT_X + 120;
	var MEETCURSOR_DEFAULT_Y = BATTER_DEFAULT_Y + 50;
	var BALL_DEFAULT_X = PITCHER_X + PITCHERSIZE_X/4;
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

	//スペースが押されたとき呼ばれる関数（バッターとミートカーソルのswing関数を呼ぶ）
		function get_space(){
			Batter.swing();
			MeetCursor.swing();
		}

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

	//背景
		BackgroundBatting = new Sprite(GROUNDSIZE_X,GROUNDSIZE_Y);
		BackgroundBatting.image = game.assets['img/background_batting.jpg'];
		BackgroundBatting.x = 0;
		BackgroundBatting.y = 0;
		//BackgroundBatting.x = CAMERA_BATTING_X;
		//BackgroundBatting.y = CAMERA_BATTING_Y;
	
	//ピッチャー
		var Pitcher = new Sprite(PITCHERSIZE_X, PITCHERSIZE_Y);
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
		//セットモーションを呼び出す関数
		Pitcher.set_throw = function(){

		}
		//投球関数（引数で投球コース、スピードとか
		Pitcher.throw_ball = function(template_num){
			Ball.x = BALL_DEFAULT_X;
			Ball.y = BALL_DEFAULT_Y;

			console.log(this.x,this.y);
			switch(template_num){
				case 0:
					//テンプレート呼ばない場合（超ランダムとか用に用意しとく、使わないかも）
					break;
				case　1: //デバック用、ど真ん中ストレート
					Ball.direction_x = 1;//1:右、-1:左
					Ball.direction_y = 1;//1:前、-1:後
					Ball.speed_x = 0;
					Ball.speed_y = 10;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						/*if(hit_flag == true){
								Camera.removeChild(this);
						}*/
						//else if(hit_flag == false){
								//投球進行
						this.y = this.y + this.direction_y*this.speed_y;
						if ( this.y >= GROUNDSIZE_Y-15 ) {
							Camera.removeChild(this);
							throw_flag = true;
						}
						//}
					});
					break;
			}
			Pitcher.throw_interval_count = 0;
			console.log('throw')
			Camera.addChild(Ball);
		};
		//フレーム処理
		Pitcher.addEventListener('enterframe', function(){
			if( (throw_flag == true) && (this.frame == 9) ){
				throw_flag = false;
				this.throw_interval_count = 0;
				//(予定)ここで球種、コース選定する
				this.throw_ball(1);
			}
			else if(　(throw_flag == true) && (this.throw_interval_count == PITCH_INTERVAL) ){
				if(game.frame % (game.fps/10) == 0){
	            	this.frame++;
	        	}
			}
			//インターバルカウント
			else if ( (throw_flag == true) && (game.frame % game.fps == 0) ) {
				this.throw_interval_count++;
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

	//投球（ミートカーソルの判定用にここで定義、詳細はthrow_ballの中で設定）
		var Ball = new Sprite(30, 30);
		Ball.image = game.assets['img/ball.png'];

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
		Camera.addChild(Pitcher);
		Camera.addChild(Batter);
		Camera.addChild(MeetCursor);

	//ボールとミートカーソル共有フラグ
		hit_flag = false;		
	
	//add
		SceneBatting.addChild(Camera);
		//SceneBatting.addChild(BackgroundBatting);
		//SceneBatting.addChild(LastBallNumLabel);
		//SceneBatting.addChild(PointLabel);
		//SceneBatting.addChild(Pitcher);
		//SceneBatting.addChild(Batter);
		//SceneBatting.addChild(MeetCursor);


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
				LastBallNumLabel.text = "<div class='label'>残り"+last_ball_num+"球</div>";
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

		game.addEventListener('spacebuttondown', get_space);
		game.pushScene(SceneTitle);
	};
	game.start();
};