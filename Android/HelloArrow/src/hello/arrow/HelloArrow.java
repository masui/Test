//実験機A

package jp.mtrrr.HelloArrow;

import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.app.Activity;
import android.content.Context;
import android.content.res.Configuration;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.RadioGroup.OnCheckedChangeListener;
import android.widget.Toast;

//実験機A

public class HelloArrow extends Activity implements LocationListener, SensorEventListener, OnClickListener,OnCheckedChangeListener{
   
	//ビュー
    private HelloArrowView helloArrowView;
    //レイアウト
    private final int FP = ViewGroup.LayoutParams.FILL_PARENT;//フルのスペース
    private final int WC = ViewGroup.LayoutParams.WRAP_CONTENT;//必要なぶんだけのスペース   
	//ボタン
    private Button up_btn;
    private Button down_btn; 
    private RadioGroup radioGroup;
    private RadioButton gps_btn;
    private RadioButton network_btn;

    //センサー
    private SensorManager	sensorManager;//センサーマネージャー
    private Sensor			orientationSensor;  //回転せンサー
    private LocationManager locationManager;//ロケーションマネージャー    
    //取得した値
    private float[] orientation =new float[3];//傾き
    public double lat_start;//=35.3889;
    public double lng_start;//=139.4263;
    private double lat_goal;//=35.3971;//実験用に固定　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　☆
    private double lng_goal;//=139.4656;//実験用に固定    　　　　　　　　　　　　　　　　　　　　　　　　　　　☆
    //通信
    private HttpConnection httpConnection; 
    private boolean up_flg=false;
    private boolean down_flg=false;  
    private String URL = "http://web.sfc.keio.ac.jp/~mtrrr/android_compass/latlngB.txt";
    private String URL2="http://web.sfc.keio.ac.jp/~mtrrr/android_compass/receiveA.php?latlngA="+lat_start+","+lng_start;
    private String str="";
    private String[] str2={"",""};
    private String str3;
    
    private boolean startEx_flg =false;
    
    private int i=0;
    
    
    //タイマー
    int tickcount;
    
    Timer timer = null;   //タイマを定義
    
//起動時に呼ばれる場所====================================================    
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle icicle) {
    	super.onCreate(icicle);    	
    	setRequestedOrientation(Configuration.ORIENTATION_PORTRAIT);
    	requestWindowFeature(Window.FEATURE_NO_TITLE);
    	setLayout();//																	まだsetLayoutメソッドの実験からコード直してないお！
    	                  
        //センサーマネージャの取得(1)
        sensorManager=(SensorManager)getSystemService(Context.SENSOR_SERVICE);
        
        //センサーの取得(2)
        List<Sensor> list;
        list=sensorManager.getSensorList(Sensor.TYPE_ORIENTATION);
        if (list.size()>0) orientationSensor=list.get(0);
        
        //ロケーションマネージャの設定(2)
        locationManager=(LocationManager)getSystemService(Context.LOCATION_SERVICE);
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER,0,0,this);
       
        
        //コネクションマネージャーの設定
        httpConnection = new HttpConnection();       
        Toast.makeText(this, "onCreate()", Toast.LENGTH_SHORT).show();
        
        //タイマー
        //カウント値の初期化
        tickcount = 0;
        //Timerを設定する
        timer = new Timer(true);
        final android.os.Handler handler = new android.os.Handler();
        timer.schedule(
        		   new TimerTask() {
        		    @Override
        		    public void run() {
        		     // TODO Auto-generated method stub
        		     handler.post( new Runnable(){
        		      public void run(){
        		             //結果出力用のテキストボックス
        		       tickcount++;
        		       
        		      }
        		     });
        		    }
        		   }, 1000, 1000);  //初回起動の遅延と周期指定。単位はms
       }

    
//レイアウト=========================================================================	
	protected void setLayout() {
	
		LinearLayout linearLayout = new LinearLayout(this);
        linearLayout.setOrientation(LinearLayout.VERTICAL);//縦に追加していく。
        linearLayout.setBackgroundColor(Color.argb(0, 0, 0, 255));
        setContentView(linearLayout);

        helloArrowView =new HelloArrowView(this);
        
        LinearLayout btnLinearLayout = new LinearLayout(this);
        btnLinearLayout.setOrientation(LinearLayout.HORIZONTAL);//横に追加していく。
        btnLinearLayout.setBackgroundColor(Color.argb(50, 255, 0, 0));

        LinearLayout radioLinearLayout = new LinearLayout(this);
        radioLinearLayout.setOrientation(LinearLayout.HORIZONTAL);
        radioLinearLayout.setBackgroundColor(Color.argb(50, 255, 0, 0));
        
        up_btn = new Button(this);
        up_btn.setText("アップロードテスト");
        up_btn.setOnClickListener(this);
        
        down_btn = new Button(this);
        down_btn.setText("ダウンロードテスト");
        down_btn.setOnClickListener(this);
        
        btnLinearLayout.addView(up_btn, createParam(WC, WC));
        btnLinearLayout.addView(down_btn, createParam(WC, WC));     
               
        gps_btn = new RadioButton(this);
        gps_btn.setText("連続通知OFF　　");
        gps_btn.setId(0);
        network_btn = new RadioButton(this);
        network_btn.setText("連続通知ON ");
        network_btn.setId(1);
        
        radioGroup=new RadioGroup(this);
        radioGroup.addView(gps_btn);
        radioGroup.addView(network_btn);     
        radioGroup.check(0);       
        radioGroup.setOrientation(LinearLayout.HORIZONTAL);
        radioGroup.setOnCheckedChangeListener(this);
        radioLinearLayout.addView(radioGroup, createParam(WC, WC));
        
       
        linearLayout.addView(helloArrowView, createParam(WC, 550)); 
        linearLayout.addView(btnLinearLayout, createParam(WC, 100));  
        linearLayout.addView(radioLinearLayout, createParam(WC, WC)); 
        
	}
	//createParamの定義 
    private LinearLayout.LayoutParams createParam(int w, int h){
        return new LinearLayout.LayoutParams(w, h);
    }
//ボタン系===================================================================    
    public void onClick(View v) {
    	
    	if(v == up_btn){
    		
    		try{			
    			str3=httpConnection.http2str(this,URL2);//	
    			Toast.makeText(this, "成功", Toast.LENGTH_SHORT).show();
    		}catch(Exception e){
    			Toast.makeText(this, "エラー", Toast.LENGTH_SHORT).show();
    		}
    		
    		/*if(up_flg){
    			up_flg = false;
    		}else{
    			up_flg = true;
    		}  	*/	
    	}if(v == down_btn){
    		    		
    		try{
    			str=httpConnection.http2str(this, URL);
       			str2 =str.split(",");
       			lat_goal=Double.valueOf(str2[0]);
       			lng_goal=Double.valueOf(str2[1]);
       			Toast.makeText(this, "成功", Toast.LENGTH_SHORT).show();
    		}catch(Exception e){
    			Toast.makeText(this, "エラー", Toast.LENGTH_SHORT).show();
    		}
    		
    		/*if(down_flg){
    			down_flg = false;
    		}else{
    			down_flg = true;
    		}  */  	    		
    	}
    	
    }    
//ラヂオボタン系===================================================================    
	public void onCheckedChanged(RadioGroup group, int checkedId) {
				
		if(checkedId==0){
			startEx_flg= false;
			Toast.makeText(this, "連続通知OFF", Toast.LENGTH_SHORT).show();
		}
		if(checkedId==1){
			startEx_flg= true;
			Toast.makeText(this, "連続通知ON", Toast.LENGTH_SHORT).show();
			
		}
		
	}
//アプリの開始時に呼ばれる場所==========================================================   
    @Override
    protected void onResume() {
        //アプリの開始
        super.onResume();
        if (orientationSensor!=null) {
            sensorManager.registerListener(this, orientationSensor,SensorManager.SENSOR_DELAY_FASTEST);
        }
    }
//アプリの休止時に呼ばれる場所==========================================================
    @Override
    protected void onPause() {
        super.onPause();
        locationManager.removeUpdates(this);
    }
    @Override
    protected void onRestart(){
    	super.onRestart();
    	locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER,0,0,this);
    }
//アプリの停止時に呼ばれる場所==========================================================
    @Override
    protected void onStop() {
        //センサーの処理の停止(4)
        sensorManager.unregisterListener(this);
        //locationManager.removeUpdates(this);
        //アプリの停止
        super.onStop();
    } 
    
//方位関係=======================================================================
    
    //センサーリスナーの処理(4)
    public void onSensorChanged(SensorEvent event) {
        //少数2桁切り捨て
        for (int i=0;i<3;i++) {
            int w=(int)(10*event.values[i]);
            event.values[i]=(float)(w/10.0f);
        }

        //方向の取得
        if (event.sensor==orientationSensor) {
        	orientation=event.values;
        } 
        helloArrowView.invalidate();//再描画の処理
    }

    //精度変更イベントの処理
    public void onAccuracyChanged(Sensor sensor,int accuracy) {
    }
//位置関係===================================================================

	//@Override
	public void onLocationChanged(Location location) {
		//自分のlatlngを更新
		lat_start = location.getLatitude();
		lng_start = location.getLongitude();		
		
		//URL2 = "http://web.sfc.keio.ac.jp/~mtrrr/android_compass/receiveA.php?latlngA="+lat_start+","+lng_start;//ここにおかないとlatlngがnullになる。
		URL2 = "http://web.sfc.keio.ac.jp/~mtrrr/android_compass/receiveA.php?latlngA="+lat_start+","+lng_start;
		//でもここにおくだけだと初期値がはいらなくてエラーになる。
		//自分のlatlngをあいてに通知
		
		if(startEx_flg){
			if(tickcount%10==0){		
			try{
    			httpConnection.http2str(this,URL2);//									httpConnection.http2str(this,URL2);とどうちがうの？
    			Toast.makeText(this, "アップ", Toast.LENGTH_SHORT).show();
			}catch(Exception e){
    			Toast.makeText(this, "エラー", Toast.LENGTH_SHORT).show();
    			}
			}
			if(tickcount%10==5){
    		try{
    			str=httpConnection.http2str(this, URL);
       			str2 =str.split(",");
       			lat_goal=Double.valueOf(str2[0]);
       			lng_goal=Double.valueOf(str2[1]);
       			Toast.makeText(this, "ダウン", Toast.LENGTH_SHORT).show();
    		}catch(Exception e){
    			Toast.makeText(this, "エラー", Toast.LENGTH_SHORT).show();
    		}
		  }
		}
		
	}

	@Override
	public void onProviderDisabled(String provider) {
		// TODO Auto-generated method stub		
	}

	@Override
	public void onProviderEnabled(String provider) {
		// TODO Auto-generated method stub		
	}

	@Override
	public void onStatusChanged(String provider, int status, Bundle extras) {
		// TODO Auto-generated method stub
		
	}
   
//ビュー===============================================================
    public class HelloArrowView extends View {
       
        //コンストラクタ
        public HelloArrowView(Context context) {
            super(context);
            setBackgroundColor(Color.WHITE);
        }

        //描画
        @Override 
        protected void onDraw(Canvas canvas) {
        	//
        	CalucuLatLng calucuLatLng = new CalucuLatLng(lat_start, lng_start, lat_goal, lng_goal);
    		//キャンバスのローテーション用
    		int w =canvas.getWidth();//このキャンバスってhelloArrowView？それとも全部？
    		int h =canvas.getHeight();
    		int cx =w/2;
    		int cy =h/2-60;
        	
            //ペイント
            Paint paint=new Paint();   
            Path path =new Path();
            paint.setAntiAlias(true);
            paint.setStyle(Paint.Style.STROKE);
            //確認用
            paint.setTextSize(20);
            paint.setColor(Color.GRAY);
            canvas.drawText("自分:"+lat_start+","+lng_start,0,40*2,paint);
    		canvas.drawText("相手:"+lat_goal+","+lng_goal,0,40*3,paint);
    		canvas.drawText("タイマー"+tickcount%10,0,40*4,paint);
            //本物
    		paint.setColor(Color.BLUE);
    		paint.setTextSize(40);
    		canvas.drawText("あと"    +calucuLatLng.getDistance()+"メートル", 0,40*1,paint);
    		paint.setColor(Color.GRAY);
    		canvas.drawCircle(cx,cy,100,paint);
            paint.setStyle(Paint.Style.FILL);
    		path.moveTo(0,-80);
    		path.lineTo(-30,60);
    		path.lineTo(0,50);
    		path.lineTo(30,60);
    		path.close();
            
    		paint.setTextSize(30);
    		
            
	
    		//キャンバスの回転
    		canvas.translate(cx, cy);
 
    		canvas.rotate(-(calucuLatLng.getAngle()+orientation[0]));
    		canvas.drawPath(path, paint);
            
        }
    }


}
