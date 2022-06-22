--[[
-- This file is generated automatically and is not intended to be modified.
-- To view the source code, see the 'src' folder on GitHub!
--
-- Author: 0866
-- License: MIT
-- GitHub: https://github.com/richie0866/remote-spy
--]]

local instanceFromId = {}
local idFromInstance = {}

local modules = {}
local currentlyLoading = {}

-- Module resolution

local function loadModule(object, caller)
	local module = modules[object]

	if module.isLoaded then
		return module.data
	end

	if caller then
		currentlyLoading[caller] = object

		local currentObject = object
		local depth = 0
	
		-- Keep looping until we reach the top of the dependency chain.
		-- Throw an error if we encounter a circular dependency.
		while currentObject do
			depth = depth + 1
			currentObject = currentlyLoading[currentObject]
	
			if currentObject == object then
				local str = currentObject:GetFullName()
	
				for _ = 1, depth do
					currentObject = currentlyLoading[currentObject]
					str = str .. "  ⇒ " .. currentObject:GetFullName()
				end
	
				error("Failed to load '" .. object:GetFullName() .. "'! Detected a circular dependency chain: " .. str, 2)
			end
		end
	end

	local data = module.fn()

	if currentlyLoading[caller] == object then -- Thread-safe cleanup!
		currentlyLoading[caller] = nil
	end

	module.data = data
	module.isLoaded = true

	return data
end

local function start()
	if not game:IsLoaded() then
		game.Loaded:Wait()
	end

	for object in pairs(modules) do
		if object:IsA("LocalScript") and not object.Disabled then
			task.defer(loadModule, object)
		end
	end
end

-- Project setup

local globalMt = {
	__index = getfenv(0),
	__metatable = "This metatable is locked",
}

local function _env(id)
	local object = instanceFromId[id]

	return setmetatable({
		script = object,
		require = function (target)
			if modules[target] and target:IsA("ModuleScript") then
				return loadModule(target, object)
			else
				return require(target)
			end
		end,
	}, globalMt)
end

local function _module(name, className, path, parent, fn)
	local instance = Instance.new(className)
	instance.Name = name
	instance.Parent = instanceFromId[parent]

	instanceFromId[path] = instance
	idFromInstance[instance] = path

	modules[instance] = {
		fn = fn,
		isLoaded = false,
		value = nil,
	}
end

local function _instance(name, className, path, parent)
	local instance = Instance.new(className)
	instance.Name = name
	instance.Parent = instanceFromId[parent]

	instanceFromId[path] = instance
	idFromInstance[instance] = path
end
