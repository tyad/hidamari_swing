enchant();

window.onload = function mogura() {
	var game = new Game(480, 480);
	game.keybind(32, "space");  // spaceキー
	game.preload(
		'img/background_title.png',
		'img/logo.png',
		'img/background_batting.jpg',
		'img/yuno.gif',
		'img/bat.gif',
		'img/miyako.gif',
		'img/meetcursor.png',
		'img/ball.gif',
		'img/ball_shadow.gif',
		'img/swing_button.png',
		'sound/bgm_batting.wav'
	);


//**********
//コンフィグ定数（モード別にするならここをいじる）
//**********
	//画面サイズ
	var SCREEN_SIZE_X = 480;
	var SCREEN_SIZE_Y = 480;
	//グラウンド全体サイズ
	var GROUND_SIZE_X = 2400;
	var GROUND_SIZE_Y = 1600;
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
		BackgroundTitle.image = game.assets['img/background_title.png'];

	//*ロゴ*
		var TitleLogo = new Sprite(332,200);
		TitleLogo.x = 50;
		TitleLogo.y = 30;
		TitleLogo.image = game.assets['img/logo.png'];

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
		SceneTitle.addChild(TitleLogo);
		SceneTitle.addChild(StartButton);

//*********************
//バッティング画面
//*********************

	//スペースが押されたとき呼ばれる関数（バッターとミートカーソルのswing関数を呼ぶ）
		function get_space(){
			if(Batter.swing_flag == true){
				Batter.swing();
			}
		}

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
			switch(template_num){
				case 0:
					//テンプレート呼ばない場合（超ランダムとか用に用意しとく、使わないかも）
					break;

				case　1: //デバック用ど真ん中スローボール
					//投球（ミートカーソルの判定用にここで定義、詳細はthrow_ballの中で設定）
					Ball.speed_x = 0;
					Ball.speed_y = 2;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.y = this.y + this.speed_y;
						if ( this.y >= GROUND_SIZE_Y-15 ) {
							Camera.removeChild(this);
							Pitcher.throw_flag = true;
							LastBall.decrement();
						}
					});
					break;


				case　2: //ストレート 左右に少し角度がつく
					Ball.direction_x = (Math.random() - Math.random()) * 0.8;//1:右、-1:左
					Ball.direction_y = 1;//1:前、-1:後
					Ball.speed_x = 1;
					Ball.speed_y = 10 + Math.random() * 5;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.x = this.x + this.direction_x*this.speed_x;
						this.y = this.y + this.direction_y*this.speed_y;
						if ( this.y >= GROUND_SIZE_Y-15 ) {
							Camera.removeChild(this);
							Pitcher.throw_flag = true;
							LastBall.decrement();
						}
					});
					break;


				case　3: //カーブとシンカー 弧を描く
					Ball.carve = Math.random() * 3 + 2;

					if(parseInt(Math.random()*10)%2 == 1) Ball.carve *= -1;
					Ball.speed_x = 	Ball.carve;
					Ball.speed_y = 8 + Math.random() * 3;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){

						this.speed_x -=  Ball.carve/21
						this.x = this.x + this.speed_x;
						this.y = this.y + this.speed_y;
						if ( this.y >= GROUND_SIZE_Y-15 ) {
							Camera.removeChild(this);
							Pitcher.throw_flag = true;
							LastBall.decrement();
						}
					});
					break;


				case　4: //ナックル ぶれる 見切りづらいボール
					Ball.speed_x = (Math.random() - Math.random()) * 0.8;
					Ball.speed_y = 10 + Math.random() * 2;
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
						if(this.throw_frame %2 == 1)this.plus_x *= -1;
						

						this.x = this.x + this.speed_x+this.plus_x;
						this.y = this.y + this.speed_y;
						if ( this.y >= GROUND_SIZE_Y-15 ) {
							Camera.removeChild(this);
							Pitcher.throw_flag = true;
							LastBall.decrement();
						}
					});
					break;


				case　5: //スローボール

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
						if ( this.y >= GROUND_SIZE_Y-15 ) {
							Camera.removeChild(this);
							Pitcher.throw_flag = true;
							LastBall.decrement();
						}
					});
					break;


				case　6: //チェンジアップ：スローボールの強化版

					Ball.speed_x = (Math.random() - Math.random()) * 0.8;
					Ball.speed_y = 5 + Math.random() * 3;
					Ball.buoyancy = -9;
					Ball.throw_frame = 0;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.throw_frame ++;

						

						Ball.buoyancy += 0.5
						
						this.x = this.x + this.speed_x;
						this.y = this.y + this.speed_y + Ball.buoyancy;
						if ( this.y >= GROUND_SIZE_Y-15 ) {
							Camera.removeChild(this);
							Pitcher.throw_flag = true;
							LastBall.decrement();
						}
					});
					break;


				case　7: //オウルボール

					Ball.speed_x = (Math.random() - Math.random()) * 0.5;
					Ball.speed_ex_x = 20;
					Ball.speed_y = 8 + Math.random() * 3;
					Ball.throw_frame = 2;
					//フレーム処理
					Ball.addEventListener('enterframe', function(){
						this.throw_frame ++;

						if(this.throw_frame % 2 == 0) Ball.speed_ex_x *= -1;
						
						this.x = this.x + this.speed_x + this.speed_x + this.speed_ex_x;
						this.y = this.y + this.speed_y;
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

					this.ball_type = parseInt((Math.random()*10) %6 +2); //とりあえずデバッグ以外の6種からランダム
					console.log('ball_type:'+this.ball_type)
					this.throw_ball(this.ball_type);
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
		Bat.swing_frame = 0; //スイングした時のフレームカウント
		Bat.image = game.assets['img/bat.gif'];
		//**************要調整*************
    	Bat.rotation = 0;
		Bat.addEventListener('enterframe', function(){
			Bat.swing_frame++;
			if(Batter.swing_flag == false){	
				if(this.swing_frame==1){ //宮子中割の設定とバットの初期化
					Bat.x = -9999; //再表示で不自然にならないように退ける
    			Bat.rotation = 33;
					Batter.frame = 2; //振る前の中割を設定
				}else if(this.swing_frame < 7){
					Batter.frame = 3; //振るアニメ
					Bat.rotation -=11; 
					//回転と位置が同期するように差分を取る
					Bat.distance_x = -48 * Math.cos((Bat.rotation + 180) * Math.PI/180);
					Bat.distance_y = -48 * Math.sin((Bat.rotation + 180) * Math.PI/180);
					//差分を利用してバッターの腕にくっつける
					Bat.x = Batter.x + Bat.distance_x + 22;
					Bat.y = Batter.y + BATTER_SIZE_Y/2 + Bat.distance_y + 2;
				}else if(this.swing_frame == 7){
					Batter.frame = 4; //振るアニメ
					Bat.x = -9999; //表示が不自然にならないように退ける
				}else if(this.swing_frame == 8){
					Batter.frame = 5; //振るアニメ

				}else if(this.swing_frame == 9){
					Batter.frame = 6; //振るアニメ


				}else if(this.swing_frame == 14){
					Batter.frame = 5; //振るアニメ

				}
				//投球されている場合振り切ったままになるように制御
				if(Pitcher.throw_flag == false && this.swing_frame > 10){
					this.swing_frame = 10;

				}
				if(this.swing_frame >= 15){
					Camera.removeChild(Bat);
					Bat.swing_frame= 0; //フレームカウントリセット
					Batter.swing_flag = true;	
					Batter.frame = 1; //振るアニメ
				}
			}
		});
		//***************************

 
	//*バッター*
		var Batter = new Sprite(BATTER_SIZE_X, BATTER_SIZE_Y);
		Batter.x = BATTER_DEFAULT_X;
		Batter.y = BATTER_DEFAULT_Y;
		Batter.image = game.assets['img/miyako.gif'];
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
				Batter.y = Batter.y - 1.5;
			}else if(game.input.down && Batter.y < BATTER_DEFAULT_Y+BATTER_LIMIT_Y){
				Batter.y = Batter.y + 1.5;
			}
			if(game.input.left && Batter.x > BATTER_DEFAULT_X-BATTER_LIMIT_X){
				Batter.x = Batter.x - 1.5;
			}else if(game.input.right && Batter.x < BATTER_DEFAULT_X+BATTER_LIMIT_X){
				Batter.x = Batter.x + 1.5;
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
			//
			if(Pitcher.throw_flag == false){
				if(MeetCursor.intersect(Ball) && Bat.swing_frame == 4){
					LastBall.visible = false;
					Point.visible = false;
					Camera.removeChild(Ball);
					console.log('hit'); //for debag
					MeetCursor.hit_flag = false;
				    //打球角度
				    var angle = 90 - ((Ball.y + BALL_SIZE_Y/2) - (MeetCursor.y + MEETCURSOR_SIZE_Y/2)) * 2.5 * -1;
				    console.log('angle:'+angle);//for debug
				    //ミートカーソルとボールの距離計算
				    var distance = Math.sqrt(Math.pow((Ball.x + BALL_SIZE_X/2) - (MeetCursor.x + MEETCURSOR_SIZE_X/2), 2) + Math.pow((Ball.y + BALL_SIZE_Y/2) - (MeetCursor.y + MEETCURSOR_SIZE_Y/2), 2));
					console.log('distance:'+distance);//for debug
				    //真芯値
				    var meetpoint = 30;
				    //打球スピード
				    var batted_speed = (meetpoint - distance)* 0.7 + 2;
					if(batted_speed < 3){
						batted_speed = 3;	
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
					BattedBall.buoyancy = 3  + batted_speed * 0.25 - (Math.sqrt(Math.pow((Ball.y + BALL_SIZE_Y/2) - (MeetCursor.y + MEETCURSOR_SIZE_Y/2), 2)))/4;
					if(BattedBall.buoyancy < 0.5)BattedBall.buoyancy = 0.5;

					console.log('tate:'+(Math.sqrt(Math.pow((Ball.y + BALL_SIZE_Y/2) - (MeetCursor.y + MEETCURSOR_SIZE_Y/2), 2)))/3);
					console.log('buoyancy:'+BattedBall.buoyancy);
					//飛距離（得点）
					BattedBall.flown = 0;
					//フレーム処理
					BattedBall.addEventListener('enterframe', function(){
							this.x = this.x - this.speed_x;
							this.y = this.y - this.speed_y;
							this.h =  this.h + this.buoyancy;
							this.buoyancy -= 0.1;



						if(this.stop_flag == false){

							if(this.h <= 0){

								console.log('落下');

								BattedBall._element.style.zIndex = 1;
								BattedBallHop._element.style.zIndex = 1;

								this.stop_flag = true;
							//*取得点*
								var NowPoint = new Label();
								NowPoint.x = (Camera.x * -1) + SCREEN_SIZE_X/2;
								NowPoint.y = (Camera.y * -1) + SCREEN_SIZE_Y/2;
								console.log(NowPoint.x);
								NowPoint.text = "<h1 class='label'>飛距離:"+parseInt(BattedBall.flown)+"点</h1>";
								Camera.addChild(NowPoint);
								setTimeout(function(){
									Camera.removeChild(this);
									Camera.removeChild(NowPoint);
									LastBall.decrement();
									Pitcher.throw_flag = true;
									Point.addition(parseInt(BattedBall.flown)); 
									LastBall.visible = true;
									Point.visible = true;

									Camera.speed = 12;
									Camera.target_x = CAMERA_BATTING_X;
									Camera.target_y = CAMERA_BATTING_Y;

									Camera.removeChild(BattedBall);
								},3000);
							}else{
								//飛距離でスコア計算されるように修正
								this.flown += batted_speed * 0.05;
							}

							//カメラ追従
							if(this.y >= CAMERA_BATTING_Y){
								Camera.speed = 4;
								Camera.target_x = Camera.target_x + this.speed_x
								Camera.target_y = Camera.target_y + this.speed_y;
							}
						


						}


						if(this.h < 0){

						this.buoyancy *= -0.25;
						if(parseInt(this.bouyancy) == 0) this.bouyancy =0;
						this.h =this.buoyancy;
					batted_speed *= 0.6;
					BattedBall.speed_x = batted_speed * Math.cos(angle * Math.PI/180);
					BattedBall.speed_y = batted_speed * Math.sin(angle * Math.PI/180);
						}

					});

				  var BattedBallHop = new Sprite(BALL_SIZE_X, BALL_SIZE_Y);
					BattedBallHop.image = game.assets['img/ball.gif'];
					BattedBallHop.x = 0;
					BattedBallHop.y = 0;

					BattedBallHop.addEventListener('enterframe', function(){
					BattedBallHop.x = BattedBall.x  - BattedBall.speed_x;
					BattedBallHop.y = BattedBall.y -BattedBall.speed_y- BattedBall.h - BALL_SIZE_Y/3;


					});

					Camera.addChild(BattedBall);
					Camera.addChild(BattedBallHop);


					BattedBall._element.style.zIndex = 2;
					BattedBallHop._element.style.zIndex = 2;
					Batter._element.style.zIndex = 3;

			    }else if(MeetCursor.hit_flag == true){
					console.log('スカ');
				}
			}
			//移動 バッターの位置についていく
			MeetCursor.x = Batter.x + 110;
			MeetCursor.y = Batter.y + 60;

		});
		
	//*カメラ*
		var Camera = new Group();
		Camera.x = CAMERA_BATTING_X;
		Camera.y = CAMERA_BATTING_Y + 2000;
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

		Camera.speed = 5; //目的に対する追従速度

		Camera.addEventListener('enterframe', function(){
			Camera.x = parseInt(Camera.x - (Camera.x - Camera.target_x)/Camera.speed);
			Camera.y = parseInt(Camera.y -(Camera.y - Camera.target_y)/Camera.speed);
		});

	//add
		SceneBatting.addChild(Camera);
		// シーン更新処理
 		SceneBatting.onenterframe = function() {
            // BGM ループ再生
            game.assets['sound/bgm_batting.wav'].play();
        };



	
//******************
//リザルト画面
//****************
	//*背景*
		var BackgroundResult = new Sprite(SCREEN_SIZE_X, SCREEN_SIZE_Y);
		BackgroundResult.image = game.assets['img/background_title.png'];

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