local TS = require(script.Parent.include.RuntimeLib)
local logger = TS.import(script, script.Parent, "reducers", "remote-log")
local store = TS.import(script, script.Parent, "store")
local getFunctionScript = TS.import(script, script.Parent, "utils", "function-util").getFunctionScript
local getInstanceId = TS.import(script, script.Parent, "utils", "instance-util").getInstanceId
local makeSelectRemoteLog = TS.import(script, script.Parent, "reducers", "remote-log", "selectors").makeSelectRemoteLog

local CALLER_STACK_LEVEL = if KRNL_LOADED then 6 else 4

local FireServer = Instance.new("RemoteEvent").FireServer
local InvokeServer = Instance.new("RemoteFunction").InvokeServer
local IsA = game.IsA

local refs = {}
local selectRemoteLog = makeSelectRemoteLog()

if not hookfunction then
	return
end

if not getcallingscript then
	function getcallingscript()
		return nil
	end
end

local function onReceive(self, params, returns)
	local traceback = {}
	local callback = debug.info(CALLER_STACK_LEVEL, "f")

	local level, fn = 4, callback

	while fn do
		table.insert(traceback, fn)
		level = level + 1
		fn = debug.info(level, "f")
	end

	task.defer(function()
		local script = getcallingscript() or (callback and getFunctionScript(callback))
		local signal = logger.createOutgoingSignal(self, script, callback, traceback, params, returns)
		local remoteId = getInstanceId(self)

		if store.get(function(state)
			return selectRemoteLog(state, remoteId)
		end) then
			store.dispatch(logger.pushOutgoingSignal(remoteId, signal))
		else
			local remoteLog = logger.createRemoteLog(self, signal)
			store.dispatch(logger.pushRemoteLog(remoteLog))
		end
	end)
end

-- Hooks

refs.FireServer = hookfunction(FireServer, function(self, ...)
	if self and store.isActive() and typeof(self) == "Instance" and self:IsA("RemoteEvent") then
		onReceive(self, { ... })
	end
	return refs.FireServer(self, ...)
end)

refs.InvokeServer = hookfunction(InvokeServer, function(self, ...)
	if self and store.isActive() and typeof(self) == "Instance" and self:IsA("RemoteFunction") then
		onReceive(self, { ... })
	end
	return refs.InvokeServer(self, ...)
end)

refs.__namecall = hookmetamethod(game, "__namecall", function(self, ...)
	local method = getnamecallmethod()

	if
		(store.isActive() and method == "FireServer" and IsA(self, "RemoteEvent")) or
		(store.isActive() and method == "InvokeServer" and IsA(self, "RemoteFunction"))
	then
		onReceive(self, { ... })
	end

	return refs.__namecall(self, ...)
end)
