import { describe, it, expect } from 'vitest';
import {
  resourceReducer,
  initialResourceState,
  actionTypes,
} from './resourceReducer';

describe('resourceReducer', () => {
  describe('when an action CONSUME_WATER is dispatched', () => {
    it('should consume water with default amount of 10', () => {
      const action = { type: actionTypes.CONSUME_WATER };
      const newState = resourceReducer(initialResourceState, action);
      expect(newState.water).toBe(90); // 100 → 90
    });

    it('should consume water with custom payload amount', () => {
      const action = {
        type: actionTypes.CONSUME_WATER,
        payload: { amount: 20 },
      };
      const newState = resourceReducer(initialResourceState, action);
      expect(newState.water).toBe(80);
    });

    it('should not go below 0 when payload is too large', () => {
      const state = { ...initialResourceState, water: 5 };
      const action = {
        type: actionTypes.CONSUME_WATER,
        payload: { amount: 50 },
      };
      const newState = resourceReducer(state, action);
      expect(newState.water).toBe(0); // 5 - 50 = -45 → clamp a 0
    });
  });

  describe('when an action CONSUME_OXYGEN is dispatched', () => {
    it('should consume oxygen with default amount of 5', () => {
      const action = { type: actionTypes.CONSUME_OXYGEN };
      const newState = resourceReducer(initialResourceState, action);
      expect(newState.oxygen).toBe(95); // 100 → 95
    });

    it('should consume oxygen with custom payload amount', () => {
      const action = {
        type: actionTypes.CONSUME_OXYGEN,
        payload: { amount: 30 },
      };
      const newState = resourceReducer(initialResourceState, action);
      expect(newState.oxygen).toBe(70);
    });

    it('should not go below 0 when payload is too large', () => {
      const state = { ...initialResourceState, oxygen: 3 };
      const action = {
        type: actionTypes.CONSUME_OXYGEN,
        payload: { amount: 10 },
      };
      const newState = resourceReducer(state, action);
      expect(newState.oxygen).toBe(0);
    });
  });

  describe('when an action CONSUME_ENERGY is dispatched', () => {
    it('should consume energy with default amount of 15', () => {
      const action = { type: actionTypes.CONSUME_ENERGY };
      const newState = resourceReducer(initialResourceState, action);
      expect(newState.energy).toBe(85); // 100 → 85
    });

    it('should consume energy with custom payload amount', () => {
      const action = {
        type: actionTypes.CONSUME_ENERGY,
        payload: { amount: 50 },
      };
      const newState = resourceReducer(initialResourceState, action);
      expect(newState.energy).toBe(50);
    });

    it('should not go below 0 when payload is too large', () => {
      const state = { ...initialResourceState, energy: 10 };
      const action = {
        type: actionTypes.CONSUME_ENERGY,
        payload: { amount: 99 },
      };
      const newState = resourceReducer(state, action);
      expect(newState.energy).toBe(0);
    });
  });

  describe('when an action CONSUME_WATER_AND_OXYGEN is dispatched', () => {
    it('should consume water and oxygen with default amounts (5, 5)', () => {
      const action = { type: actionTypes.CONSUME_WATER_AND_OXYGEN };
      const newState = resourceReducer(initialResourceState, action);
      expect(newState.water).toBe(95);
      expect(newState.oxygen).toBe(95);
    });

    it('should consume water and oxygen with custom amounts (20, 15)', () => {
      const action = {
        type: actionTypes.CONSUME_WATER_AND_OXYGEN,
        payload: { waterAmount: 20, oxygenAmount: 15 },
      };
      const newState = resourceReducer(initialResourceState, action);
      expect(newState.water).toBe(80);
      expect(newState.oxygen).toBe(85);
    });

    it('should clamp water and oxygen to 0 if payload is too large', () => {
      const state = { water: 10, oxygen: 10, energy: 100 };
      const action = {
        type: actionTypes.CONSUME_WATER_AND_OXYGEN,
        payload: { waterAmount: 30, oxygenAmount: 40 },
      };
      const newState = resourceReducer(state, action);
      expect(newState.water).toBe(0);
      expect(newState.oxygen).toBe(0);
    });
  });

  describe('when an action GENERATE_OXYGEN_AND_CONSUME_ENERGY is dispatched', () => {
    it('should increase oxygen (clamped to 100) and reduce energy with default amounts (+10, -10)', () => {
      const action = { type: actionTypes.GENERATE_OXYGEN_AND_CONSUME_ENERGY };
      const newState = resourceReducer(initialResourceState, action);
      expect(newState.oxygen).toBe(100); // 100 + 10 → clamp at 100
      expect(newState.energy).toBe(90); // 100 - 10
    });

    it('should clamp oxygen and clamp energy when payload is large', () => {
      const state = { ...initialResourceState, energy: 20, oxygen: 95 };
      const action = {
        type: actionTypes.GENERATE_OXYGEN_AND_CONSUME_ENERGY,
        payload: { oxygenAmount: 10, energyCost: 50 },
      };
      const newState = resourceReducer(state, action);
      expect(newState.oxygen).toBe(100); // 95 + 10 → 105, clamp at 100
      expect(newState.energy).toBe(0); // 20 - 50 → -30, clamp at 0
    });
  });

  describe('when an action RESET_RESOURCES is dispatched', () => {
    it('should reset to the initialResourceState', () => {
      const state = { water: 50, oxygen: 20, energy: 0 };
      const action = { type: actionTypes.RESET_RESOURCES };
      const newState = resourceReducer(state, action);
      expect(newState).toEqual(initialResourceState);
    });
  });

  describe('when an unknown action type is dispatched', () => {
    it('should return the current state unchanged', () => {
      const state = { water: 50, oxygen: 50, energy: 50 };
      const action = { type: 'UNKNOWN_ACTION' };
      const newState = resourceReducer(state, action);
      expect(newState).toEqual(state);
    });
  });
});
