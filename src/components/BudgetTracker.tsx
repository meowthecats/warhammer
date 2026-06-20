import React, { useState, useEffect } from 'react';
import { DollarSign, BarChart3, Plus, Trash2, Sliders, Calendar, Sparkles, TrendingDown, HelpCircle, CheckCircle2 } from 'lucide-react';
import { NecronUnit } from '../types';
import BudgetChartD3 from './BudgetChartD3';

interface Props {
  selectedQuantities: Record<string, number>;
  necronCatalog: NecronUnit[];
  fontSizeFactor: number;
}

interface CustomExpense {
  id: string;
  name: string;
  cost: number;
}

export default function BudgetTracker({ selectedQuantities, necronCatalog, fontSizeFactor }: Props) {
  // 1. Monthly Budget Limit (Defaults to $50)
  const [monthlyLimit, setMonthlyLimit] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('budget_monthly_limit');
      return saved ? Number(saved) : 50;
    } catch {
      return 50;
    }
  });

  // 2. Overruled/Custom prices of individual kits - e.g., { 'warriors': 45, 'combat_patrol': 136 }
  const [customKitsCosts, setCustomKitsCosts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('budget_custom_kits_costs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 3. Subsidiary/Auxiliary hobby items (Glue, Primers, Brushes, etc.)
  const [auxExpenses, setAuxExpenses] = useState<CustomExpense[]>(() => {
    try {
      const saved = localStorage.getItem('budget_aux_expenses');
      return saved ? JSON.parse(saved) : [
        { id: '1', name: 'Standard Plastic Cement & Snips', cost: 15 },
        { id: '2', name: 'Starter Acrylic Paints (Silver/Green/Black)', cost: 20 }
      ];
    } catch {
      return [
        { id: '1', name: 'Standard Plastic Cement & Snips', cost: 15 },
        { id: '2', name: 'Starter Acrylic Paints (Silver/Green/Black)', cost: 20 }
      ];
    }
  });

  // Form states for adding custom items
  const [newItemName, setNewItemName] = useState('');
  const [newItemCost, setNewItemCost] = useState<number>(10);
  const [isAddingItem, setIsAddingItem] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('budget_monthly_limit', String(monthlyLimit));
  }, [monthlyLimit]);

  useEffect(() => {
    localStorage.setItem('budget_custom_kits_costs', JSON.stringify(customKitsCosts));
  }, [customKitsCosts]);

  useEffect(() => {
    localStorage.setItem('budget_aux_expenses', JSON.stringify(auxExpenses));
  }, [auxExpenses]);

  // Handle kit cost override changes
  const handleKitCostChange = (unitId: string, value: string) => {
    const num = parseFloat(value);
    setCustomKitsCosts(prev => ({
      ...prev,
      [unitId]: isNaN(num) ? 0 : Math.max(0, num)
    }));
  };

  // Reset customized cost overrides back to original catalog MSRP
  const handleResetKitCost = (unitId: string) => {
    setCustomKitsCosts(prev => {
      const updated = { ...prev };
      delete updated[unitId];
      return updated;
    });
  };

  const handleAddAuxExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || newItemCost <= 0) return;

    const newItem: CustomExpense = {
      id: `aux-${Date.now()}`,
      name: newItemName.trim(),
      cost: newItemCost
    };

    setAuxExpenses(prev => [...prev, newItem]);
    setNewItemName('');
    setNewItemCost(10);
    setIsAddingItem(false);
  };

  const handleDeleteAuxExpense = (id: string) => {
    setAuxExpenses(prev => prev.filter(item => item.id !== id));
  };

  // Compile active selected shopping list catalog items in current roster
  const selectedKits = necronCatalog.filter(u => (selectedQuantities[u.id] || 0) > 0);

  // Calculations for total expenditures
  let msrpKitsTotal = 0;              // Cost with default MSRP prices
  let actualKitsTotal = 0;            // Cost with user overrides/custom input prices
  let totalPoints = 0;

  selectedKits.forEach(unit => {
    const qty = selectedQuantities[unit.id] || 0;
    const defaultCost = unit.estimatedCostUSD;
    const actualCost = customKitsCosts[unit.id] !== undefined ? customKitsCosts[unit.id] : defaultCost;
    
    msrpKitsTotal += defaultCost * qty;
    actualKitsTotal += actualCost * qty;
    totalPoints += unit.points * qty;
  });

  const auxTotal = auxExpenses.reduce((sum, item) => sum + item.cost, 0);
  const aggregateExpenditure = actualKitsTotal + auxTotal;

  // Monthly breakdown estimates
  const monthsRequired = monthlyLimit > 0 ? Math.ceil(aggregateExpenditure / monthlyLimit) : 1;

  // Pre-calculated discount factor compared to raw MRSP
  const rawSumPlusAux = msrpKitsTotal + auxTotal;
  const currentSavings = rawSumPlusAux > aggregateExpenditure ? rawSumPlusAux - aggregateExpenditure : 0;

  return (
    <div className="bg-editorial-paper border-2 border-editorial-charcoal p-6 rounded shadow-sm space-y-6" id="hobby-budget-tracker-box">
      {/* Title Header area */}
      <div className="flex items-center gap-3 border-b-2 border-editorial-clay pb-4">
        <div className="p-2.5 bg-editorial-forest text-editorial-cream rounded">
          <DollarSign size={20} id="budget-heading-icon" />
        </div>
        <div>
          <h3 className="text-xl font-serif font-bold text-editorial-charcoal">Interactive Hobby Budget Tracker</h3>
          <p className="text-xs text-editorial-moss font-sans uppercase tracking-wider font-semibold">
            Evaluate your actual expenditures and plan purchases around custom monthly limits
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Interactive Configuration Block (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section A: Monthly Limit Configuration */}
          <div className="bg-editorial-cream/50 border border-editorial-clay p-4 rounded space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-editorial-forest flex items-center gap-1.5">
              <Sliders size={13} />
              Step 1: Define Your Safe Monthly Expenditure
            </h4>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="space-y-1 flex-1">
                <p className="text-xs text-editorial-moss font-serif leading-relaxed">
                  Keeping your hobbies financially sustainable reduces stress. Set a comfortable limit you can allocate to plastic models & craft supplies each month.
                </p>
              </div>

              {/* Input for Monthly Limit */}
              <div className="flex items-center gap-2 shrink-0 bg-white border-2 border-editorial-charcoal rounded px-3 py-1.5 shadow-xs w-full sm:w-auto">
                <span className="text-sm font-sans font-bold text-editorial-moss">$</span>
                <input
                  type="number"
                  min="5"
                  max="1000"
                  value={monthlyLimit}
                  onChange={(e) => setMonthlyLimit(Math.max(5, Number(e.target.value)))}
                  className="w-16 bg-transparent text-sm font-sans font-bold text-editorial-forest text-center focus:outline-hidden"
                  id="budget-monthly-limit-input"
                />
                <span className="text-xs font-sans font-semibold text-editorial-moss">/ month</span>
              </div>
            </div>

            {/* Presets and limits speed dials */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-editorial-clay/60 text-[11px] font-sans">
              <span className="text-editorial-moss font-bold uppercase tracking-wider mr-2">Quick Presets:</span>
              {[25, 50, 75, 100, 150].map(amt => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setMonthlyLimit(amt)}
                  className={`px-2.5 py-1 rounded font-bold transition-all border cursor-pointer ${
                    monthlyLimit === amt
                      ? 'bg-editorial-forest text-editorial-cream border-editorial-charcoal'
                      : 'bg-white text-editorial-moss border-editorial-clay hover:border-editorial-charcoal'
                  }`}
                  id={`budget-preset-btn-${amt}`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* Section B: Individual Kit Costs Customization */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-editorial-moss flex items-center gap-1.5">
              <BarChart3 size={13} className="text-editorial-forest" />
              Step 2: Customize Cost and input Actual Price of Selected Kits
            </h4>

            {selectedKits.length === 0 ? (
              <div className="text-center py-8 bg-editorial-cream/10 border border-dotted border-editorial-clay rounded text-xs text-editorial-moss italic font-serif">
                Currently, no army kits are selected in your points roster. Go select some units above to estimate their budget values!
              </div>
            ) : (
              <div className="border border-editorial-clay rounded overflow-hidden shadow-xs divide-y divide-editorial-clay bg-white" id="budget-kits-list">
                {selectedKits.map(unit => {
                  const qty = selectedQuantities[unit.id] || 0;
                  const defaultCost = unit.estimatedCostUSD;
                  const isOverridden = customKitsCosts[unit.id] !== undefined;
                  const currentActualCost = isOverridden ? customKitsCosts[unit.id] : defaultCost;

                  return (
                    <div key={unit.id} className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4" id={`budget-kit-item-${unit.id}`}>
                      {/* Name & default estimation details */}
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] px-1.5 py-0.5 font-sans font-bold uppercase tracking-wider bg-editorial-forest text-editorial-cream rounded">
                            {qty}x Selected
                          </span>
                          <span className="text-[10px] text-editorial-moss font-mono">
                            MSRP: ${defaultCost} /ea
                          </span>
                        </div>
                        <h5 className="font-serif font-bold text-editorial-charcoal text-sm leading-snug">{unit.name}</h5>
                      </div>

                      {/* Custom pricing override input field */}
                      <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                        <div className="flex items-center gap-1.5">
                          <label htmlFor={`input-cost-${unit.id}`} className="text-[10px] uppercase font-sans tracking-wider font-bold text-editorial-moss">Actual/Paid Cost:</label>
                          <div className="flex items-center gap-1 bg-editorial-cream/35 border border-editorial-charcoal rounded px-2 py-1 w-24">
                            <span className="text-xs font-sans font-bold text-editorial-moss">$</span>
                            <input
                              id={`input-cost-${unit.id}`}
                              type="number"
                              min="0"
                              max="1000"
                              value={currentActualCost}
                              onChange={(e) => handleKitCostChange(unit.id, e.target.value)}
                              className="w-full bg-transparent text-xs font-sans font-bold text-editorial-forest focus:outline-hidden"
                            />
                          </div>
                        </div>

                        {/* Reset button to clear custom value */}
                        {isOverridden && (
                          <button
                            type="button"
                            onClick={() => handleResetKitCost(unit.id)}
                            className="text-[10px] font-sans font-medium hover:underline text-editorial-moss cursor-pointer"
                            title="Reset back to catalog MSRP"
                            id={`budget-reset-kit-btn-${unit.id}`}
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section C: Optional Glue, Paints & Custom Auxiliary Expense */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-editorial-clay pb-2">
              <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-editorial-moss">
                Step 3: Supplementary Craft Supplies & Accessory Costs
              </h4>
              <button
                type="button"
                onClick={() => setIsAddingItem(!isAddingItem)}
                className="text-xs font-sans font-bold text-editorial-forest hover:underline cursor-pointer"
                id="budget-toggle-aux-form"
              >
                {isAddingItem ? 'Cancel' : '+ Add Custom Supply Item'}
              </button>
            </div>

            {/* Custom Supply Addition Form inline */}
            {isAddingItem && (
              <form onSubmit={handleAddAuxExpense} className="bg-editorial-cream/40 border border-dashed border-editorial-clay p-4 rounded flex flex-col sm:flex-row items-stretch sm:items-end gap-3" id="budget-aux-form">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] uppercase font-sans tracking-wider font-bold text-editorial-moss block">Supply Name / Accessory:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Hobby Sprue Clippers, Fine Paintbrushes, Airbrush..."
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-editorial-clay rounded text-xs font-sans focus:outline-hidden focus:border-editorial-charcoal"
                    id="budget-new-item-title"
                  />
                </div>

                <div className="w-full sm:w-28 space-y-1">
                  <label className="text-[10px] uppercase font-sans tracking-wider font-bold text-editorial-moss block">Estimated Cost ($):</label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    required
                    value={newItemCost}
                    onChange={(e) => setNewItemCost(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-1.5 bg-white border border-editorial-clay rounded text-xs font-sans focus:outline-hidden focus:border-editorial-charcoal"
                    id="budget-new-item-cost"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-editorial-forest text-editorial-cream text-xs font-sans font-bold uppercase tracking-wider rounded select-none shadow-sm cursor-pointer hover:bg-opacity-90 shrink-0"
                  id="budget-submit-new-item-btn"
                >
                  Add Item
                </button>
              </form>
            )}

            {/* List of Custom Supplementary Items */}
            {auxExpenses.length === 0 ? (
              <div className="text-center py-4 bg-editorial-cream/10 border border-dashed border-editorial-clay rounded text-xs text-editorial-moss italic font-serif">
                No extra supplies added. Use this tab to track additional spending on hobby paints or sprays!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="budget-aux-items-grid">
                {auxExpenses.map(item => (
                  <div key={item.id} className="p-3 bg-white border border-editorial-clay rounded flex justify-between items-center gap-3">
                    <div className="space-y-0.5">
                      <h5 className="text-xs font-sans font-bold text-editorial-charcoal leading-snug">{item.name}</h5>
                      <span className="text-[11px] text-editorial-forest font-bold font-sans">${item.cost}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteAuxExpense(item.id)}
                      className="text-editorial-moss hover:text-red-600 p-1 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
                      title="De-select or delete supply"
                      id={`budget-delete-aux-btn-${item.id}`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Financial Calculation Summary Block (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-editorial-cream border-2 border-editorial-charcoal p-5 rounded space-y-6 shadow-sm sticky top-4">
            <h4 className="font-serif font-black text-lg text-editorial-charcoal border-b-2 border-editorial-charcoal pb-3 flex items-center gap-2 uppercase tracking-tight">
              <Calendar size={18} className="text-editorial-forest" />
              Budget Analysis
            </h4>

            {/* Core Calculations results list */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-sans uppercase tracking-wider font-bold">
                <span className="text-editorial-moss text-[11px]">Roster Kits Total:</span>
                <span className="text-editorial-charcoal">${actualKitsTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-xs font-sans uppercase tracking-wider font-bold">
                <span className="text-editorial-moss text-[11px]">Extra Supplies Total:</span>
                <span className="text-editorial-charcoal">${auxTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-xs font-sans uppercase tracking-wider font-bold border-t border-dotted border-editorial-clay pt-3">
                <span className="text-editorial-moss text-[11px]">Total Project Cost:</span>
                <span className="text-base text-editorial-forest font-black">${aggregateExpenditure.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-[10px] font-sans uppercase tracking-wider font-bold border-b border-editorial-clay pb-3">
                <span className="text-editorial-moss">Monthly Budget Cap:</span>
                <span className="text-editorial-forest">${monthlyLimit} / month</span>
              </div>
            </div>

            {/* Live comparison D3 bar chart */}
            <BudgetChartD3 expenses={aggregateExpenditure} limit={monthlyLimit} />

            {/* Payoff Timeline Projection Box */}
            <div className="bg-white border border-editorial-clay p-4 rounded space-y-3 shadow-inner">
              <span className="text-[10px] font-sans uppercase tracking-[0.15em] font-black text-editorial-forest block">
                🗓 Est. Funding Milestone Timeline:
              </span>

              {aggregateExpenditure === 0 ? (
                <p className="text-xs text-editorial-moss italic font-serif leading-relaxed text-center py-2">
                  Add units or accessories to generate your calendar schedule.
                </p>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 animate-pulse">
                    <div className="p-1 bgColor-forest text-white bg-editorial-forest rounded-full">
                      <CheckCircle2 size={12} className="stroke-[3px]" />
                    </div>
                    <span className="text-xs font-sans font-bold text-editorial-charcoal">
                      Funded over {monthsRequired} {monthsRequired === 1 ? 'Month' : 'Months'}!
                    </span>
                  </div>

                  <p className="text-xs text-editorial-moss font-serif leading-relaxed">
                    By purchasing in chunks of maximum <strong>${monthlyLimit}</strong> per cycle, you will own and play this army without any credit debt or budget strain.
                  </p>

                  {/* Micro Timeline graphics represent months */}
                  <div className="space-y-2 pt-2 border-t border-dotted border-editorial-clay text-[11px]">
                    {Array.from({ length: Math.min(6, monthsRequired) }).map((_, index) => {
                      const monthNum = index + 1;
                      const monthPortion = Math.min(monthlyLimit, aggregateExpenditure - (index * monthlyLimit));
                      
                      return (
                        <div key={index} className="flex items-center justify-between text-editorial-moss font-serif">
                          <span>Month {monthNum}:</span>
                          <span className="font-sans font-bold text-editorial-forest bg-editorial-paper px-1.5 py-0.5 rounded border border-editorial-clay">
                            ${monthPortion.toFixed(0)} Allocated
                          </span>
                        </div>
                      );
                    })}

                    {monthsRequired > 6 && (
                      <div className="text-center text-[10px] text-editorial-moss font-serif italic pt-1 text-center">
                        ... plus {monthsRequired - 6} more budgeting cycles.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Savings / Smart Workaround Feedback */}
            {currentSavings > 0 && (
              <div className="bg-editorial-paper p-3 rounded border border-emerald-300 flex items-start gap-2">
                <Sparkles size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] text-emerald-800 font-sans uppercase tracking-wider font-bold block">Smart Savings Active!</span>
                  <p className="text-[10px] text-emerald-700 font-serif leading-snug">
                    You have saved <strong>${currentSavings.toFixed(0)}</strong> with custom discounts and kitchen workarounds!
                  </p>
                </div>
              </div>
            )}

            {/* Helpful tip footnote */}
            <div className="pt-2 text-[10px] text-editorial-moss font-serif italic leading-relaxed text-center">
              "Build small, paint completely, play forever."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
