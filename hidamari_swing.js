enchant();

window.onload = function mogura() {
	var game = new Game(480, 480);
	game.keybind(32, "space");  // spaceキー
	game.preload(
		'img/background_title.jpg',
		'img/background_batting.jpg',
		'img/yuno.gif',
		'img/bat.gif',
		'img/miyako.png',
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
	var POINT_X = (CAMERA_BATTING_X * -1) + 400;
	var POINT_Y = (CAMERA_BATTING_Y * -1) + 20;
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
	//バッター-サイズ
	var BATTER_SIZE_X = 96;
	var BATTER_SIZE_Y = 96;
	//バッター-デフォルト位置
	var BATTER_DEFAULT_X = (CAMERA_BATTING_X * -1) + SCREEN_SIZE_X/2 - PITCHER_SIZE_X/2 - 100;
	var BATTER_DEFAULT_Y = (CAMERA_BATTING_Y * -1) + SCREEN_SIZE_X/2 - PITCHER_SIZE_X/2 + 130;
	//バッターボックス制限
	var BATTER_LIMIT_X = 25;
	var BATTER_LIMIT_Y = 40;
	//ミートカーソル-サイズ
	var MEETCURSOR_SIZE_X = 64;
	var MEETCURSOR_SIZE_Y = 50;	
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
	//*背景*
		var BackgroundTitle = new Sprite(480,SCREEN_SIZE_Y);
		BackgroundTitle.image = game.assets['img/background_title.jpg'];

	//*スタートボタン*
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

	//スペースが押されたとき呼ばれる関数（バッターとミートカーソルのswing関数を呼ぶ）
		function get_space(){
			if(Batter.swing_flag == true){
				Batter.swing();
				MeetCursor.swing();
			}
		}

	//*残り球数*
		var LastBall = new Label();
		LastBall.x = LASTBALL_X;
		LastBall.y = LASTBALL_Y;
		LastBall.num = BALL_NUM;
		LastBall.text = "<div class='label'>残り"+LastBall.num+"球</div>";
		LastBall.decrement = function(){
			this.num--;
			this.text = "<div class='label'>残り"+this.num+"球</div>";
			if(this.num == 0){
				ResultPoint.text = "<h1>得点"+Point.num+"点</h1>";
				SceneResult.addChild(ResultPoint);
				game.popScene(SceneBatting);
				game.pushScene(SceneResult);
			}
		}

	//*得点*
		var Point = new Label();
		Point.x = POINT_X;
		Point.y = POINT_Y;
		Point.num = 0;
		Point.text = "<div class='label'>得点"+Point.num+"点</div>";
		Point.addition = function(point){
			this.num += point;
			Point.text = "<div class='label'>得点"+this.num+"点</div>";
		}

	//*背景*
		BackgroundBatting = new Sprite(GROUND_SIZE_X,GROUND_SIZE_Y);
		BackgroundBatting.image = game.assets['img/background_batting.jpg'];
		BackgroundBatting.x = 0;
		BackgroundBatting.y = 0;
	
	//*投球（ミートカーソルのあたり判定用にここで変数定義）*
		var Ball;

	//*ピッチャー*
		var Pitcher = new Sprite(PITCHER_SIZE_X, PITCHER_SIZE_Y);
		Pitcher.x = PITCHER_X;
		Pitcher.y = PITCHER_Y;
		Pitcher.image = game.assets['img/yuno.gif'];
		//投げるflag
		Pitcher.throw_flag = true;
		//投球間隔カウント変数
		Pitcher.throw_interval_count = 0;
		//アニメーションフレーム
		Pitcher.frame = 0;
		//投球関数（引数で投球コース、スピードとか
		Pitcher.throw_ball = function(template_num){
			Ball = new Sprite(BALL_SIZE_X, BALL_SIZE_Y);
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
							Pitcher.throw_flag = true;
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
			if(this.throw_flag == true){
				//投球
				if((this.frame == 9) && (this.throw_interval_count == PITCH_INTERVAL)){
					this.throw_flag = false;
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

	//*バット*
		var Bat = new Sprite(96,32);
		Bat.x = BATTER_DEFAULT_X + BATTER_SIZE_X/2 + 10;
		Bat.y = BATTER_DEFAULT_Y + BATTER_SIZE_Y/2;
		Bat.image = game.assets['img/bat.gif'];
		//**************要調整*************
        Bat.rotation = 60;
		Bat.addEventListener('enterframe', function(){
			if(Batter.swing_flag == false){	
				if(Bat.rotation == -60){//6
						Bat.x = BATTER_DEFAULT_X + BATTER_SIZE_X/2;
						Bat.y = BATTER_DEFAULT_Y + BATTER_SIZE_Y/2 - 20;
				}else if(Bat.rotation == -40){//5
						
						Bat.x = BATTER_DEFAULT_X + BATTER_SIZE_X/2 - 10;
						Bat.y = BATTER_DEFAULT_Y + BATTER_SIZE_Y/2 - 10;
				}else if(Bat.rotation == -20){//4
						MeetCursor.hit_flag = false;
						console.log('hit_flag:'+MeetCursor.hit_flag);					
						Bat.x = BATTER_DEFAULT_X + BATTER_SIZE_X/2 - 10;
						Bat.y = BATTER_DEFAULT_Y + BATTER_SIZE_Y/2;
				}else if(Bat.rotation == 0){//3
						MeetCursor.hit_flag = true;
						console.log('hit_flag:'+MeetCursor.hit_flag);
						Bat.x = BATTER_DEFAULT_X + BATTER_SIZE_X/2;
						Bat.y = BATTER_DEFAULT_Y + BATTER_SIZE_Y/2 - 10;
				}else if(Bat.rotation == 20){//2
						
						Bat.x = BATTER_DEFAULT_X + BATTER_SIZE_X/2 + 10;
						Bat.y = BATTER_DEFAULT_Y + BATTER_SIZE_Y/2;
				}else if(Bat.rotation == 40){//1
						Bat.x = BATTER_DEFAULT_X + BATTER_SIZE_X/2 + 10;
						Bat.y = BATTER_DEFAULT_Y + BATTER_SIZE_Y/2 + 10;
				}else if(Bat.rotation == 60){//0
						Bat.x = BATTER_DEFAULT_X + BATTER_SIZE_X/2;
						Bat.y = BATTER_DEFAULT_Y + BATTER_SIZE_Y/2 + 20;
				}				
				this.rotation -= 20; //0:150,1:100,2:-50,3:0,4:50,5:280,6:330
				if(this.rotation < -60){
					Camera.removeChild(Bat);
				}
			}
		});
		//***************************


	//*バッター*
		var Batter = new Sprite(BATTER_SIZE_X, BATTER_SIZE_Y);
		Batter.x = BATTER_DEFAULT_X;
		Batter.y = BATTER_DEFAULT_Y;
		Batter.image = game.assets['img/miyako.png'];
		Batter.frame = 0;
		Batter.swing_flag = true;
		//スイング（スペース押したときの）処理
		Batter.swing = function(){
			console.log('swing'); //for debug
			this.swing_flag = false;	
			Camera.addChild(Bat);
		}
		//フレーム処理
		Batter.addEventListener('enterframe', function(){
			if(this.swing_flag == false){
				if(this.frame <= 1){
					this.frame = 2;
				}else if(Bat.rotation < -60){
					this.frame++;
					//Batのリセット
					Bat.rotation = 60;
					this.swing_flag = true;
				}
			}
			//構えモーション
			if(Pitcher.throw_flag == false){
				if(this.frame == 0){
					this.frame = 1;
				}
			}else if(Pitcher.throw_flag == true){
				this.frame = 0;
			}

			//移動
			if(game.input.up && Batter.y > BATTER_DEFAULT_Y-BATTER_LIMIT_Y){
				Batter.y = Batter.y - 1;
			}else if(game.input.down && Batter.y < BATTER_DEFAULT_Y+BATTER_LIMIT_Y){
				Batter.y = Batter.y + 1;
			}
			if(game.input.left && Batter.x > BATTER_DEFAULT_X-BATTER_LIMIT_X){
				Batter.x = Batter.x - 1;
			}else if(game.input.right && Batter.x < BATTER_DEFAULT_X+BATTER_LIMIT_X){
				Batter.x = Batter.x + 1;
			}
		});

	//*ミートカーソル*
		var MeetCursor = new Sprite(70, 50);
		MeetCursor.x = MEETCURSOR_DEFAULT_X;
		MeetCursor.y = MEETCURSOR_DEFAULT_Y;
		MeetCursor.image = game.assets['img/meetcursor.png'];
		//ヒットフラグ
		MeetCursor.hit_flag = false;
		//スイング（スペース押したときの）処理
		MeetCursor.swing = function(){
			
		}
		//フレーム処理
		MeetCursor.addEventListener('enterframe', function(){
			//
			if(Pitcher.throw_flag == false){
				if(MeetCursor.intersect(Ball) && MeetCursor.hit_flag == true){
					LastBall.visible = false;
					Point.visible = false;
					Camera.removeChild(Ball);
					console.log('hit'); //for debag
					MeetCursor.hit_flag = false;
				    //打球角度
				    var angle = 90 - ((Ball.y + BALL_SIZE_Y/2) - (MeetCursor.y + MEETCURSOR_SIZE_Y/2)) * 2.5 * -1;
				    console.log('angle:'+angle);//for debug
				    //ミートカーソルとボールの距離計算
				    var distance = Math.sqrt(Math.pow((Ball.x + BALL_SIZE_X/2) - (MeetCursor.x + MEETCURSOR_SIZE_X/2), 2));
					console.log('distance:'+distance);//for debug
				    //真芯値
				    var meetpoint = 30;
				    //打球スピード
				    var batted_speed = meetpoint - distance;
				    console.log('batted_speed:'+batted_speed);//for debug
				//*打球*
				    var BattedBall = new Sprite(BALL_SIZE_X, BALL_SIZE_Y);
					BattedBall.x = Ball.x;
					BattedBall.y = Ball.y;					
					BattedBall.image = game.assets['img/ball.png'];
					BattedBall.speed_x = batted_speed * Math.cos(angle * Math.PI/180);
					BattedBall.speed_y = batted_speed * Math.sin(angle * Math.PI/180);
					//打球の地面からの高さ
					BattedBall.h = 0.5;
					//打球が着地したらtrue
					BattedBall.stop_flag = false;
					//浮力
					BattedBall.buoyancy = batted_speed;
					//飛距離（得点）
					BattedBall.flown = 0;
					//フレーム処理
					BattedBall.addEventListener('enterframe', function(){
						if(this.stop_flag == false){
							this.x = this.x - this.speed_x;
							this.y = this.y - this.speed_y;
							this.h =  this.h + this.buoyancy;
							this.buoyancy -= 0.1;
							if(this.h <= 0){
								console.log('落下');
								this.stop_flag = true;
							//*取得点*
								var NowPoint = new Label();
								NowPoint.x = (Camera.x * -1) + SCREEN_SIZE_X/2;
								NowPoint.y = (Camera.y * -1) + SCREEN_SIZE_Y/2;
								console.log(NowPoint.x);
								NowPoint.text = "<h1 class='label'>飛距離:"+BattedBall.flown+"点</h1>";
								Camera.addChild(NowPoint);
								setTimeout(function(){
									Camera.removeChild(this);
									Camera.removeChild(NowPoint);
									LastBall.decrement();
									Pitcher.throw_flag = true;
									Point.addition(BattedBall.flown);
									LastBall.visible = true;
									Point.visible = true;
									Camera.x = CAMERA_BATTING_X;
									Camera.y = CAMERA_BATTING_Y;
									Camera.removeChild(BattedBall);
								},3000);
							}else{
								this.flown += 1;
							}
							//カメラ追従
							if(this.y >= CAMERA_BATTING_Y){
								Camera.x = Camera.x + this.speed_x
								Camera.y = Camera.y + this.speed_y;
							}
						}
					});
					Camera.addChild(BattedBall);
			    }else if(MeetCursor.hit_flag == true){
					console.log('スカ');
				}
			}
			//移動
			if (game.input.up && MeetCursor.y > MEETCURSOR_DEFAULT_Y-BATTER_LIMIT_Y){
				MeetCursor.y = MeetCursor.y - 1;
			}else if (game.input.down && MeetCursor.y < MEETCURSOR_DEFAULT_Y+BATTER_LIMIT_Y){
				MeetCursor.y = MeetCursor.y + 1;
			}
			if (game.input.left && MeetCursor.x > MEETCURSOR_DEFAULT_X-BATTER_LIMIT_X){
				MeetCursor.x = MeetCursor.x - 1;
			}else if (game.input.right && MeetCursor.x < MEETCURSOR_DEFAULT_X+BATTER_LIMIT_X){
				MeetCursor.x = MeetCursor.x + 1;
			}
		});
		

	//*カメラ*
		var Camera = new Group();
		Camera.x = CAMERA_BATTING_X;
		Camera.y = CAMERA_BATTING_Y;
		Camera.addChild(BackgroundBatting);
		Camera.addChild(LastBall);
		Camera.addChild(Point);
		Camera.addChild(Pitcher);
		Camera.addChild(Batter);
		Camera.addChild(MeetCursor);		
	
	//add
		SceneBatting.addChild(Camera);
	
//******************
//リザルト画面
//****************
	//*背景*
		var BackgroundResult = new Sprite(SCREEN_SIZE_X, SCREEN_SIZE_Y);
		BackgroundResult.image = game.assets['img/background_title.jpg'];

	//*得点*
		var ResultPoint = new Label();
		ResultPoint.x = 240;
		ResultPoint.y = 240;

	//add
		SceneResult.addChild(BackgroundResult);
		SceneResult.addChild(ResultPoint);

//##########
//ゲーム管理
//##########
		game.addEventListener('spacebuttondown', get_space);
		game.pushScene(SceneTitle);

	};
	game.start();
};