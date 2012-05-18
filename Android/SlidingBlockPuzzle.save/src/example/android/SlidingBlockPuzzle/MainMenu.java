package example.android.SlidingBlockPuzzle;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class MainMenu extends Activity implements OnClickListener {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.mainmenu);
		Button Button_New_Game = (Button) findViewById(R.id.button_new_game);
		Button_New_Game.setOnClickListener(this);
	}

	public void onClick(View view) {
		switch (view.getId()) {
		case R.id.button_new_game:
			Intent intent = new Intent(this, GameView.class);
			startActivity(intent);
			finish();
			break;

		}
	}
}