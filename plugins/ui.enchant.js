/**
 * ui.enchant.js v1.0
 * ui parts support
 * @require enchant.js v0.3 or later
 * @require image files for gamepad (default: pad.png, apad.png)
 *
 * @features
 * - D-Pad (left, right, up, down)
 * - Analog Pad
 * - Button (3 built-in themes and can be customized)
 *
 * @usage
 * [D-Pad]
 * var pad = new Pad();
 * pad.x = 0;
 * pad.y = 220;
 * game.rootScene.addChild(pad);
 *  (input of X direction can be detected from "Xbuttonup" "Xbuttondown" events
 *   or enchant.Game.instance.input.X)
 *
 * [A-Pad]
 * var pad = new APad();
 * pad.x = 0;
 * pad.y = 220;
 * game.rootScene.addChild(pad);
 *  (input can be detected from pad.vx/vy and pad.touched)
 *
 * [Button]
 * var button = new Button("Press me");
 * button.addEventListener("touchstart", function(){ ... })
 * game.rootScene.addEventListener(button);
 *
 * var button_light = new Button("Press me", "light");
 * game.rootScene.addEventListener(button);
 *
 * var button_blue = new Button("Press me", "blue");
 * game.rootScene.addEventListener(button);
 *
 */

enchant.ui = { assets: ['./plugins/pad.png'] };

/**
 * 方向キーパッドのクラス: Pad
 * @scope enchant.ui.Pad
 */
enchant.ui.Pad = enchant.Class.create(enchant.Sprite, {
    /**
     * 方向キーパッドオブジェクトを作成する。
     * @constructs
     * @extends enchant.Sprite
     */
    initialize: function() {
        var game = enchant.Game.instance;
        var image = game.assets['./plugins/pad.png'];
        enchant.Sprite.call(this, image.width / 2, image.height);
        this.image = image;
        this.input = { left: false, right: false, up: false, down:false };
        this.addEventListener('touchstart', function(e) {
            this._updateInput(this._detectInput(e.localX, e.localY));
        });
        this.addEventListener('touchmove', function(e) {
            this._updateInput(this._detectInput(e.localX, e.localY));
        });
        this.addEventListener('touchend', function(e) {
            this._updateInput({ left: false, right: false, up: false, down:false });
        });
    },
    _detectInput: function(x, y) {
        x -= this.width / 2;
        y -= this.height / 2;
        var input = { left: false, right: false, up: false, down:false };
        if (x * x + y * y > 200) {
            if (x < 0 && y < x * x * 0.1 && y > x * x * -0.1) {
                input.left = true;
            }
            if (x > 0 && y < x * x * 0.1 && y > x * x * -0.1) {
                input.right = true;
            }
            if (y < 0 && x < y * y * 0.1 && x > y * y * -0.1) {
                input.up = true;
            }
            if (y > 0 && x < y * y * 0.1 && x > y * y * -0.1) {
                input.down = true;
            }
        }
        return input;
    },
    _updateInput: function(input) {
        var game = enchant.Game.instance;
        ['left', 'right', 'up', 'down'].forEach(function(type) {
            if (this.input[type] && !input[type]) {
                game.dispatchEvent(new Event(type + 'buttonup'));
            }
            if (!this.input[type] && input[type]) {
                game.dispatchEvent(new Event(type + 'buttondown'));
            }
        }, this);
        this.input = input;
    }
});
