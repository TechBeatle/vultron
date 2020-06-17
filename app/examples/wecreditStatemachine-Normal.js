const assert = require("assert");
const hex2ascii = require('hex2ascii')
const Machine = require("xstate").Machine;
const createModel = require("@xstate/test").createModel;
const  EXPIRE_CREDIT = 400;
const  CLEAR_CREDIT = 500;
const  CLOSE_CREDIT = 600;
let asyncFlag = false;
const MAX_COUNT = 60;

function revertAsyncFlag() {
asyncFlag = !asyncFlag;
}


// contract interface 

class CreditController {
constructor(fuzzer) {
  this.address = "0xa49ceaaab6e1fa8c00881b789b6f627db3198b9b";
  this.name = "CreditController";
  this.fuzzer = fuzzer;
}

async getCreditAddressByCreditNo() {
  let fuzz = await this.fuzzer.full_fuzz_fun("CreditController", this.address, "getCreditAddressByCreditNo");
  return fuzz;
}

async transferAndDiscountCheck() {
  let fuzz = await this.fuzzer.full_fuzz_fun("CreditController", this.address, "transferAndDiscountCheck");
  return fuzz;
}

async transferCredit() {
  let fuzz = await this.fuzzer.full_fuzz_fun("CreditController", this.address, "transferCredit");
  return fuzz;
}

async staticArrayToDynamicArray() {
  let fuzz = await this.fuzzer.full_fuzz_fun("CreditController", this.address, "staticArrayToDynamicArray");
  return fuzz;
}

async accountIsOk() {
  let fuzz = await this.fuzzer.full_fuzz_fun("CreditController", this.address, "accountIsOk");
  return fuzz;
}

async expireOrClearOrCloseCredit(option) {
  let fuzz = await this.fuzzer.full_fuzz_fun("CreditController", this.address, "expireOrClearOrCloseCredit", option);
  return fuzz;
}

async discountCredit() {
  let fuzz = await this.fuzzer.full_fuzz_fun("CreditController", this.address, "discountCredit");
  return fuzz;
}

async state() {
  let fuzz = await this.fuzzer.full_fuzz_fun("CreditController", this.address, "state");
  return fuzz;
}

async createCredit() {
  let fuzz = await this.fuzzer.full_fuzz_fun("CreditController", this.address, "createCredit");
  return fuzz;
}

}
// state machine context
class StateMachineCtx {
constructor(fsmreplayer, fuzzer) {
  this.CreditController = new CreditController(fuzzer);

  this.state = {
    "id": "FSM#1"
  };
  this.fuzzer = fuzzer;
  this.fsmreplayer = fsmreplayer;
}
async initialize() {
  this.CreditController.address = await this.fsmreplayer.initialize();
}
static getInstance(fsmreplayer, fuzzer) {
  if (!StateMachineCtx.instance)
    StateMachineCtx.instance = new StateMachineCtx(fsmreplayer, fuzzer);
  return StateMachineCtx.instance;
}
async getState() {
  //TO DO, set what your state means and how to get the state
  if (this.CreditController.state) {
    let ret = await this.CreditController.state();
    this.state = BigInt(ret.receipt.result.output.toString());
  } else if (this.CreditController.stage) {
    let ret = await this.CreditController.stage();
    this.state = BigInt(ret.receipt.result.output.toString());
  } else {
    this.state = null;
  }
  console.log("state:", this.state);
  return this.state;
}
// action_functions_mapping
async action_CREATE() {
  let ret = [];
  if (asyncFlag) {
    // bcos passed status:0
    let executeStatus = BigInt(0);
    let ctx = StateMachineCtx.getInstance();
    let count = 0;
    // PreCondition. 
    let preState = await ctx.getState();
    assert(null == preState || preState == 0, "preCondition violated: current state is " + preState);

    let retcreateCredit = await StateMachineCtx.getInstance().CreditController.createCredit();
    ret.push(retcreateCredit);
    console.log("current test case: ", BigInt(retcreateCredit.receipt.status.toString()) == BigInt(0) ? "passed" : "failed");
    executeStatus += BigInt(retcreateCredit.receipt.status.toString());
    while (executeStatus != 0 && count < MAX_COUNT) {
      count++;
      executeStatus = BigInt(0);
      let retcreateCredit = await StateMachineCtx.getInstance().CreditController.createCredit();
      ret.push(retcreateCredit);
      console.log("current test case: ", BigInt(retcreateCredit.receipt.status.toString()) == BigInt(0) ? "passed" : "failed");
      executeStatus += BigInt(retcreateCredit.receipt.status.toString());
    }

    if (count >= MAX_COUNT) {
      throw "TIMEOUT,  too many failed test cases!";
    }
    let postState = await ctx.getState();
    assert(null == postState || postState == 1, "postCondition violated: current state is " + postState);
    // PostCondition. 
  }
  return ret;
}
async action_DISCOUNT() {
  let ret = [];
  if (asyncFlag) {
    // bcos passed status:0
    let executeStatus = BigInt(0);
    let ctx = StateMachineCtx.getInstance();
    let count = 0;
    // PreCondition. 
    let preState = await ctx.getState();
    assert(null == preState || preState == 1, "preCondition violated: current state is " + preState);

    let retdiscountCredit = await StateMachineCtx.getInstance().CreditController.discountCredit();
    ret.push(retdiscountCredit);
    console.log("current test case: ", BigInt(retdiscountCredit.receipt.status.toString()) == BigInt(0) ? "passed" : "failed");
    executeStatus += BigInt(retdiscountCredit.receipt.status.toString());
    while (executeStatus != 0 && count < MAX_COUNT) {
      count++;
      executeStatus = BigInt(0);
      let retdiscountCredit = await StateMachineCtx.getInstance().CreditController.discountCredit();
      ret.push(retdiscountCredit);
      console.log("current test case: ", BigInt(retdiscountCredit.receipt.status.toString()) == BigInt(0) ? "passed" : "failed");
      executeStatus += BigInt(retdiscountCredit.receipt.status.toString());
    }

    if (count >= MAX_COUNT) {
      throw "TIMEOUT,  too many failed test cases!";
    }
    let postState = await ctx.getState();
    assert(null == postState || postState == 2, "postCondition violated: current state is " + postState);
    // PostCondition. 
  }
  return ret;
}
async action_TRANSFER() {
  let ret = [];
  if (asyncFlag) {
    // bcos passed status:0
    let executeStatus = BigInt(0);
    let ctx = StateMachineCtx.getInstance();
    let count = 0;
    // PreCondition. 
    let preState = await ctx.getState();
    assert(null == preState || preState == 1, "preCondition violated: current state is " + preState);

    let rettransferCredit = await StateMachineCtx.getInstance().CreditController.transferCredit();
    ret.push(rettransferCredit);
    console.log("current test case: ", BigInt(rettransferCredit.receipt.status.toString()) == BigInt(0) ? "passed" : "failed");
    executeStatus += BigInt(rettransferCredit.receipt.status.toString());
    while (executeStatus != 0 && count < MAX_COUNT) {
      count++;
      executeStatus = BigInt(0);
      let rettransferCredit = await StateMachineCtx.getInstance().CreditController.transferCredit();
      ret.push(rettransferCredit);
      console.log("current test case: ", BigInt(rettransferCredit.receipt.status.toString()) == BigInt(0) ? "passed" : "failed");
      executeStatus += BigInt(rettransferCredit.receipt.status.toString());
    }

    if (count >= MAX_COUNT) {
      throw "TIMEOUT,  too many failed test cases!";
    }
    let postState = await ctx.getState();
    assert(null == postState || postState == 1, "postCondition violated: current state is " + postState);
    // PostCondition. 
  }
  return ret;
}
async action_EXPIRE() {
  let ret = [];
  if (asyncFlag) {
    // bcos passed status:0
    let executeStatus = BigInt(0);
    let ctx = StateMachineCtx.getInstance();
    let count = 0;
    // PreCondition. 
    let preState = await ctx.getState();
    assert(null == preState || preState == 1 || preState == 2, "preCondition violated: current state is " + preState);

    let retexpireOrClearOrCloseCredit = await StateMachineCtx.getInstance().CreditController.expireOrClearOrCloseCredit({static:[{index:3, value:EXPIRE_CREDIT}]});
    ret.push(retexpireOrClearOrCloseCredit);
    console.log("current test case: ", BigInt(retexpireOrClearOrCloseCredit.receipt.status.toString()) == BigInt(0) ? "passed" : "failed");
    executeStatus += BigInt(retexpireOrClearOrCloseCredit.receipt.status.toString());
    while (executeStatus != 0 && count < MAX_COUNT) {
      count++;
      executeStatus = BigInt(0);
      let retexpireOrClearOrCloseCredit = await StateMachineCtx.getInstance().CreditController.expireOrClearOrCloseCredit({static:[{index:3, value:EXPIRE_CREDIT}]});
      ret.push(retexpireOrClearOrCloseCredit);
      console.log("current test case: ", BigInt(retexpireOrClearOrCloseCredit.receipt.status.toString()) == BigInt(0) ? "passed" : "failed");
      executeStatus += BigInt(retexpireOrClearOrCloseCredit.receipt.status.toString());
    }

    if (count >= MAX_COUNT) {
      throw "TIMEOUT,  too many failed test cases!";
    }
    let postState = await ctx.getState();
    assert(null == postState || postState == 3 || postState == 3, "postCondition violated: current state is " + postState);
    // PostCondition. 
  }
  return ret;
}
async action_CLOSE() {
  let ret = [];
  if (asyncFlag) {
    // bcos passed status:0
    let executeStatus = BigInt(0);
    let ctx = StateMachineCtx.getInstance();
    let count = 0;
    // PreCondition. 
    let preState = await ctx.getState();
    assert(null == preState || preState == 1 || preState == 2, "preCondition violated: current state is " + preState);

    let retexpireOrClearOrCloseCredit = await StateMachineCtx.getInstance().CreditController.expireOrClearOrCloseCredit({static:[{index:3, value:CLOSE_CREDIT}]});
    ret.push(retexpireOrClearOrCloseCredit);
    console.log("current test case: ", BigInt(retexpireOrClearOrCloseCredit.receipt.status.toString()) == BigInt(0) ? "passed" : "failed");
    executeStatus += BigInt(retexpireOrClearOrCloseCredit.receipt.status.toString());
    while (executeStatus != 0 && count < MAX_COUNT) {
      count++;
      executeStatus = BigInt(0);
      let retexpireOrClearOrCloseCredit = await StateMachineCtx.getInstance().CreditController.expireOrClearOrCloseCredit({static:[{index:3, value:CLOSE_CREDIT}]});
      ret.push(retexpireOrClearOrCloseCredit);
      console.log("current test case: ", BigInt(retexpireOrClearOrCloseCredit.receipt.status.toString()) == BigInt(0) ? "passed" : "failed");
      executeStatus += BigInt(retexpireOrClearOrCloseCredit.receipt.status.toString());
    }

    if (count >= MAX_COUNT) {
      throw "TIMEOUT,  too many failed test cases!";
    }
    let postState = await ctx.getState();
    assert(null == postState || postState == 5 || postState == 5, "postCondition violated: current state is " + postState);
    // PostCondition. 
  }
  return ret;
}
async action_CLEAR() {
  let ret = [];
  if (asyncFlag) {
    // bcos passed status:0
    let executeStatus = BigInt(0);
    let ctx = StateMachineCtx.getInstance();
    let count = 0;
    // PreCondition. 
    let preState = await ctx.getState();
    assert(null == preState || preState == 1 || preState == 2, "preCondition violated: current state is " + preState);

    let retexpireOrClearOrCloseCredit = await StateMachineCtx.getInstance().CreditController.expireOrClearOrCloseCredit({static:[{index:3, value:CLEAR_CREDIT}]});
    ret.push(retexpireOrClearOrCloseCredit);
    console.log("current test case: ", BigInt(retexpireOrClearOrCloseCredit.receipt.status.toString()) == BigInt(0) ? "passed" : "failed");
    executeStatus += BigInt(retexpireOrClearOrCloseCredit.receipt.status.toString());
    while (executeStatus != 0 && count < MAX_COUNT) {
      count++;
      executeStatus = BigInt(0);
      let retexpireOrClearOrCloseCredit = await StateMachineCtx.getInstance().CreditController.expireOrClearOrCloseCredit({static:[{index:3, value:CLEAR_CREDIT}]});
      ret.push(retexpireOrClearOrCloseCredit);
      console.log("current test case: ", BigInt(retexpireOrClearOrCloseCredit.receipt.status.toString()) == BigInt(0) ? "passed" : "failed");
      executeStatus += BigInt(retexpireOrClearOrCloseCredit.receipt.status.toString());
    }

    if (count >= MAX_COUNT) {
      throw "TIMEOUT,  too many failed test cases!";
    }
    let postState = await ctx.getState();
    assert(null == postState || postState == 4 || postState == 4, "postCondition violated: current state is " + postState);
    // PostCondition. 
  }
  return ret;
}
}
// state machine 
const createStateMachine = statectx => {
return Machine({
  id: "FSM#1",
  initial: "initial",
  context: {
    ctx: statectx
  },
  states: {

    initial: {
      on: {
        CREATE: {
          target: "created",
          actions: "action_CREATE"
        }
      }
    },
    created: {
      on: {
        TRANSFER: {
          target: "created",
          actions: "action_TRANSFER"
        },
        DISCOUNT: {
          target: "discounted",
          actions: "action_DISCOUNT"
        },
        EXPIRE: {
          target: "expired",
          actions: "action_EXPIRE"
        },
        CLEAR: {
          target: "cleared",
          actions: "action_CLEAR"
        },
        CLOSE: {
          target: "closed",
          actions: "action_CLOSE"
        }
      }
    },
    discounted: {
      on: {
        EXPIRE: {
          target: "expired",
          actions: "action_EXPIRE"
        },
        CLEAR: {
          target: "cleared",
          actions: "action_CLEAR"
        },
        CLOSE: {
          target: "closed",
          actions: "action_CLOSE"
        }
      }
    },
    expired: {
      type: "final"
    },
    cleared: {
      type: "final"
    },
    closed: {
      type: "final"
    }
  }
}, {
  actions: {
    action_CREATE: statectx.action_CREATE,
    action_DISCOUNT: statectx.action_DISCOUNT,
    action_TRANSFER: statectx.action_TRANSFER,
    action_EXPIRE: statectx.action_EXPIRE,
    action_CLOSE: statectx.action_CLOSE,
    action_CLEAR: statectx.action_CLEAR
  }
});
}

module.exports.StateMachineCtx = StateMachineCtx
module.exports.revertAsyncFlag = revertAsyncFlag;
module.exports.createStateMachine = createStateMachine