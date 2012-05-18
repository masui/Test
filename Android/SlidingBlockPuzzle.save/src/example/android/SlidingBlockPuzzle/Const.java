package example.android.SlidingBlockPuzzle;

import android.graphics.Color;

public class Const {
	public static final int ROW = 4;
	public static final int IMAGE_SIZE = 300;
	public static final int CELL_SIZE = IMAGE_SIZE / ROW;
	public static final int COLOR_BLANK_BLOCK_EDGE = Color.rgb(255, 255, 255);
	public static final int WIDTH_BLANK_BLOCK_EDGE = 5;
	public static final int SHUFFLE = 10;
	public static final int BLOCK_BLANK = 0;
	public static final int MOVE_UPPER = 0;
	public static final int MOVE_BOTTOM = 1;
	public static final int MOVE_RIGHT = 2;
	public static final int MOVE_LEFT = 3;
	public static final int GAME_COMPLETE = 1;
	public static final String KEY_RECORD = "RECORD";
	public static final String PREFS_NAME = "example.android.SlidingBlockPuzzle";
	public static final String DATA_BESTRECORD = "BESTRECORD";
	public static final int ID_MENUITEM_SHUFFLE = 100;
	public static final int ID_MENUITEM_EXIT = 101;
}
