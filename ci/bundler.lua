local MODEL_FILE = "ci/RemoteSpy.rbxm"
local RUNTIME_FILE = "ci/runtime.lua"

local bundleFile = ...
local debugMode = select(2, ...) == "debug"

local function pushModule(object, output)
	local id = object:GetFullName()
	local source = remodel.getRawProperty(object, "Source")

	local path = string.format("%q", id)
	local parent = object.Parent and string.format("%q", object.Parent:GetFullName()) or "nil"
	local name = string.format("%q", object.Name)
	local className = string.format("%q", object.ClassName)

	if debugMode then
		local def = table.concat({
			"_module(" .. name .. ", " .. className .. ", " .. path .. ", " .. parent .. ", function ()",
			"local fn = assert(loadstring(" .. string.format("%q", source) .. ", '@'.." .. path .. "))",
			"setfenv(fn, _env(" .. path .. "))",
			"return fn()",
			"end)",
		}, " ")
		table.insert(output, def)
	else
		local def = table.concat({
			"_module(" .. name .. ", " .. className .. ", " .. path .. ", " .. parent .. ", function ()",
			"return setfenv(function()",
			source,
			"end, _env(" .. path .. "))()",
			"end)",
		}, " ")
		table.insert(output, def)
	end
end

local function pushInstance(object, output)
	local id = object:GetFullName()

	local path = string.format("%q", id)
	local parent = object.Parent and string.format("%q", object.Parent:GetFullName()) or "nil"
	local name = string.format("%q", object.Name)
	local className = string.format("%q", object.ClassName)

	local def = table.concat({
		"_instance(" .. name .. ", " .. className .. ", " .. path .. ", " .. parent .. ")",
	}, "\n")
	table.insert(output, def)
end

local function pushAllInstances(object, output)
	if object.ClassName == "LocalScript" or object.ClassName == "ModuleScript" then
		pushModule(object, output)
	else
		pushInstance(object, output)
	end

	for _, child in ipairs(object:GetChildren()) do
		pushAllInstances(child, output)
	end
end

local function main()
	local output = { remodel.readFile(RUNTIME_FILE) }

	pushAllInstances(remodel.readModelFile(MODEL_FILE)[1], output)
	table.insert(output, "start()")

	remodel.writeFile(bundleFile, table.concat(output, "\n\n"))
end

main()
