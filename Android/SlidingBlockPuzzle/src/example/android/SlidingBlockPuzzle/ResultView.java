package example.android.SlidingBlockPuzzle;

import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

public class ResultView extends Activity implements OnClickListener {
	private int new_record;
	private int best_record;

	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.resultview);
		Button button_exit = (Button) findViewById(R.id.button_exit);
		button_exit.setOnClickListener(this);
		Bundle extras = getIntent().getExtras();
		TextView text_record = (TextView) findViewById(R.id.text_record);
		this.new_record = extras.getInt(Const.KEY_RECORD);
		text_record.setText(Integer.toString(this.new_record) + " steps");
		loadRecord();
		TextView text_bestrecord = (TextView) findViewById(R.id.text_bestrecord);
		text_bestrecord
				.setText((Integer.toString(this.best_record) + " steps"));
		if (this.new_record < this.best_record || this.best_record == 0) {
			text_bestrecord.setText(Integer.toString(this.new_record)
					+ " steps");
			saveRecord();
		}
	}

	public void onClick(View view) {
		switch (view.getId()) {
		case R.id.button_exit:
			this.finish();
			break;
		}
	}

	private void saveRecord() {
		SharedPreferences.Editor prefs = getSharedPreferences(Const.PREFS_NAME,
				0).edit();
		prefs.putInt(Const.DATA_BESTRECORD, this.new_record);
		prefs.commit();
	}

	private void loadRecord() {
		SharedPreferences prefs = getSharedPreferences(Const.PREFS_NAME, 0);
		this.best_record = prefs.getInt(Const.DATA_BESTRECORD, 0);
	}
}
