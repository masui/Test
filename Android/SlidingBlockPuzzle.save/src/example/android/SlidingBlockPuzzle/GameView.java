package example.android.SlidingBlockPuzzle;

import java.util.Random;

import android.app.Activity;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.os.Bundle;
import android.view.Gravity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class GameView extends Activity implements OnClickListener {
	private Bitmap[] piece;
	private int[] block;
	private int step;
	private TextView text_step;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(createViews());
		initialize();
		separateImage();
		createBlankBlock();
		shufflePieces();
		drawImage();
	}

	public void onClick(View view) {
		slidePiece(view.getId());
	}

	private LinearLayout createViews() {
		LinearLayout ll_root = new LinearLayout(this);
		ll_root.setOrientation(LinearLayout.VERTICAL);
		ll_root.setGravity(Gravity.CENTER);
		this.text_step = new TextView(this);
		this.text_step.setText("STEP: 0");
		ll_root.addView(this.text_step);
		for (int i = 0; i < Const.ROW; i++) {
			LinearLayout ll = new LinearLayout(this);
			ll.setOrientation(LinearLayout.HORIZONTAL);
			ll.setGravity(Gravity.CENTER_HORIZONTAL);
			for (int j = 0; j < Const.ROW; j++) {
				ImageView iv = new ImageView(this);
				iv.setId(i * Const.ROW + j);
				iv.setOnClickListener(this);
				iv.setImageResource(R.drawable.android75);
				ll.addView(iv);
			}
			ll_root.addView(ll);
		}
		return ll_root;
	}

	private void initialize() {
		this.piece = new Bitmap[Const.ROW * Const.ROW];
		this.block = new int[Const.ROW * Const.ROW];
		for (int i = 0; i < Const.ROW * Const.ROW; i++) {
			this.block[i] = i;
		}
		this.step = 0;
	}

	private void separateImage() {
		Resources r = getResources();
		Bitmap image = BitmapFactory.decodeResource(r, R.drawable.android);
		for (int i = 0; i < Const.ROW; i++) {
			for (int j = 0; j < Const.ROW; j++) {
				int x = j * Const.CELL_SIZE;
				int y = i * Const.CELL_SIZE;
				piece[i * Const.ROW + j] = Bitmap.createBitmap(image, x, y,
						Const.CELL_SIZE, Const.CELL_SIZE);
			}
		}
	}

	private void drawImage() {
		for (int i = 0; i < Const.ROW * Const.ROW; i++) {
			ImageView iv = (ImageView) findViewById(i);
			iv.setImageBitmap(piece[block[i]]);
		}
	}

	private void createBlankBlock() {
		Bitmap blank = Bitmap.createBitmap(Const.CELL_SIZE, Const.CELL_SIZE,
				Bitmap.Config.ARGB_8888);
		Canvas canvas = new Canvas(blank);
		Paint paint = new Paint();
		paint.setColor(Const.COLOR_BLANK_BLOCK_EDGE);
		paint.setStrokeWidth(Const.WIDTH_BLANK_BLOCK_EDGE);
		canvas.drawLine(0, 0, 0, Const.CELL_SIZE, paint);
		canvas.drawLine(0, 0, Const.CELL_SIZE, 0, paint);
		canvas.drawLine(Const.CELL_SIZE, 0, Const.CELL_SIZE, Const.CELL_SIZE,
				paint);
		canvas.drawLine(0, Const.CELL_SIZE, Const.CELL_SIZE, Const.CELL_SIZE,
				paint);
		this.piece[0] = blank;
	}

	private int getBlankBlock() {
		for (int i = 0; i < Const.ROW * Const.ROW; i++) {
			if (this.block[i] == Const.BLOCK_BLANK) {
				return i;
			}
		}
		return 0;
	}

	private void shufflePieces() {
		Random r = new Random();
		for (int i = 0; i < Const.SHUFFLE; i++) {
			int blank = getBlankBlock();
			int n = r.nextInt(4);
			int temp = blank;
			switch (n) {
			case Const.MOVE_UPPER:
				if (blank > Const.ROW - 1) {
					blank -= Const.ROW;
				}
				break;
			case Const.MOVE_BOTTOM:
				if (blank < Const.ROW * (Const.ROW - 1)) {
					blank += Const.ROW;
				}
				break;
			case Const.MOVE_RIGHT:
				if ((blank % Const.ROW) != Const.ROW - 1) {
					blank++;
				}
				break;
			case Const.MOVE_LEFT:
				if ((blank % Const.ROW) != 0) {
					blank--;
				}
				break;
			}
			block[temp] = block[blank];
			block[blank] = Const.BLOCK_BLANK;
		}
	}

	private void slidePiece(int id) {
		int blank = getBlankBlock();
		if (id - Const.ROW == blank || id + Const.ROW == blank
				|| (id + 1 == blank && (id % Const.ROW) != Const.ROW - 1)
				|| (id - 1 == blank && (id % Const.ROW) != 0)) {
			block[blank] = block[id];
			block[id] = Const.BLOCK_BLANK;
			drawImage();
			this.step++;
			this.text_step.setText("STEP: " + Integer.toString(this.step));
			if (checkComplete() == Const.GAME_COMPLETE)
				finishGame();
		}
	}

	private int checkComplete() {
		for (int i = 0; i < Const.ROW * Const.ROW; i++) {
			if (i != block[i]) {
				return 0;
			}
		}
		return Const.GAME_COMPLETE;
	}

	private void finishGame() {
		Intent intent = new Intent(this, ResultView.class);
		intent.putExtra(Const.KEY_RECORD, this.step);
		startActivity(intent);
		finish();
	}

	public boolean onCreateOptionsMenu(Menu menu) {
		super.onCreateOptionsMenu(menu);
		menu.add(0, Const.ID_MENUITEM_SHUFFLE, 0, "SHUFFLE");
		menu.add(0, Const.ID_MENUITEM_EXIT, 0, "EXIT");
		return true;
	}

	@Override
	public boolean onMenuItemSelected(int featureId, MenuItem item) {
		switch (item.getItemId()) {
		case Const.ID_MENUITEM_SHUFFLE:
			shufflePieces();
			drawImage();
			return true;
		case Const.ID_MENUITEM_EXIT:
			finish();
			return true;
		}
		return true;
	}
}
