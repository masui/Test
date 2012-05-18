package jp.mtrrr.HelloArrow;


import android.util.Log;
import jp.jasminesoft.gcat.scalc.LatLong2XY;
import jp.jasminesoft.gcat.scalc.DMSconv;

public class CalucuLatLng {
	
	public double X_S;//スタートのX座標
	public double Y_S;//スタートのY座標
	public double X_G;//ゴールのX座標
	public double Y_G;//ゴールのY座標
	
	public double a;//X_G-X_S
	public double b;//Y_G-Y_S
	
	//コンストラクタ
	public CalucuLatLng(double lat_start, double lng_start, double lat_goal, double lng_goal){
				
		//---------------------------------------------------------平面直角座標への変換
    	LatLong2XY XY_S = new LatLong2XY();
    	LatLong2XY XY_G = new LatLong2XY();
    	XY_S.setKei(9);
    	XY_G.setKei(9);
        //　　　　　　　　　　！！！latが緯度Yでlngが軽度Xですよ。
    	//スタートの緯度経度の変換-----------------------------------------------------------
    	//自分の緯度経度
 	
    	//①緯度経度をfloatにキャスト
    	float latS_f = (float)lat_start;
    	float lngS_f = (float)lng_start;

    	//float latA_f = (float)35.3971;								//テスト用！
    	//float lngA_f = (float)139.4657;								//テスト用！

		//②floatにした緯度経度をddd.mmssに変換する
		float latS_dms = DMSconv.deg2dms(latS_f);//ddd.mmssに変換
		float lngS_dms = DMSconv.deg2dms(lngS_f);//ddd.mmssに変換
		//③ddd.mmssをdoubleにキャスト
		double latS_dms_d = (double)latS_dms;	   //doubleに戻す
		double lngS_dms_d =(double)lngS_dms;	   //doubleに戻す
		//④XYに変換！
		XY_S.setLatitude(latS_dms_d);
		XY_S.setLongitude(lngS_dms_d);
		//数字の切り上げ
		X_S = Math.ceil(XY_S.getX());
		Y_S = Math.ceil(XY_S.getY());
		//------------------------------------------------------------------------
		
    	//ゴールの緯度経度の変換-----------------------------------------------------------

		//①緯度経度をfloatにキャスト

		float latG_f = (float) lat_goal;//float値 
		float lngG_f = (float) lng_goal;//float値 
									//テスト用！
		//②ddd.mmssに変換
		float latG_dms =DMSconv.deg2dms(latG_f);
		float lngG_dms = DMSconv.deg2dms(lngG_f);//ddd.mmssに変換
		//③doubleに戻す
		double latG_dms_d = (double)latG_dms;
		double lngG_dms_d =(double)lngG_dms;	   //doubleに戻す
		//④XYに変換
		XY_G.setLatitude(latG_dms_d);
		XY_G.setLongitude(lngG_dms_d);
		
        //⑤切り上げ
		X_G = Math.ceil(XY_G.getX());
		Y_G = Math.ceil(XY_G.getY());
        

		//-------------------------------------------------------------------------
			
		a = X_G-X_S;//経度lng
		b = Y_G-Y_S;//緯度lat
		
	}
	//距離
	public double getDistance(){
		double distance=Math.abs(Math.round(Math.sqrt(a*a+b*b)));;
		return distance;
	}
	
	public float getAngle(){
		double degree_d=0.0;
        //方位角の場合わけ
		//AとBが同緯度、同経度にいる時の場合わけ----------------
		if(X_G==X_S){
        	if(b>0){
        		degree_d=270;
        	}
        	if(b<0){
        		degree_d=90;
        	}       	
        }
        else if(Y_G==Y_S){
        	if(a>0){
        		degree_d=0;
        	}
        	if(a<0){
        		degree_d=180;
        	}
        }     
        else{	
		degree_d = Math.atan(b/a)*180/Math.PI;
		}
        //-----------------------------------------------
		//象限ごとの場合わけ
		
		float degree_offset1 = 1;
		float degree_offset2 = 0;
		
		if(a>0&&b>0){
		//第1象限	
			degree_offset1 = -1;
			degree_offset2 = 0;
		}else if(a>0&&b<0){
		//第2象限	
			degree_offset1 = -1;
			degree_offset2 = 0;
		}else if(a<0&&b<0){
		//第3象限	
			degree_offset1 = -1;
			degree_offset2 = 180;
		}else if(a<0&&b>0){
		//第4象限
			degree_offset1 = -1;
			degree_offset2 = 180;
		}
		
		Log.v("degree_d",String.valueOf(degree_d));		
		float  degree_f = (float)degree_d;
		float  angle =((degree_f)+(degree_offset2))*degree_offset1;
		  	
		return angle;
	}
}
