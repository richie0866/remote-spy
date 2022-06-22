import Make from "@rbxts/make";
import { IS_ACRYLIC_ENABLED } from "constants";
import { Lighting, Workspace } from "@rbxts/services";
import { changed } from "store";
import { selectIsClosing } from "reducers/action-bar";

const baseEffect = Make("DepthOfFieldEffect", {
	FarIntensity: 0,
	InFocusRadius: 0.1,
	NearIntensity: 1,
});

const depthOfFieldDefaults = new Map<DepthOfFieldEffect, { enabled: boolean }>();

function enable() {
	for (const [effect] of depthOfFieldDefaults) {
		effect.Enabled = false;
	}
	baseEffect.Parent = Lighting;
}

function disable() {
	for (const [effect, defaults] of depthOfFieldDefaults) {
		effect.Enabled = defaults.enabled;
	}
	baseEffect.Parent = undefined;
}

function registerDefaults() {
	const register = (object: Instance) => {
		if (object.IsA("DepthOfFieldEffect")) {
			depthOfFieldDefaults.set(object, { enabled: object.Enabled });
		}
	};
	Lighting.GetChildren().forEach(register);
	Workspace.CurrentCamera?.GetChildren().forEach(register);
}

if (IS_ACRYLIC_ENABLED) {
	registerDefaults();
	enable();
	changed(selectIsClosing, (active) => active && disable());
}
