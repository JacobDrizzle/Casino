from flask import Blueprint, jsonify
from models import db
import random
from collections import Counter
from user import token_required

# Slot symbols
slot_symbols = [
    ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈', '😉', '😊', '🙂', '🍎', '🍏', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑'],
    ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈', '😉', '😊', '🙂', '🍎', '🍏', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑'],
    ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈', '😉', '😊', '🙂', '🍎', '🍏', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑'],
    ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈', '😉', '😊', '🙂', '🍎', '🍏', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑'],
    ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈', '😉', '😊', '🙂', '🍎', '🍏', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑'],
    #['🍎', '🍏', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑'],
    #['⭐️', '🌟', '✨', '💫', '⚡️', '☄️', '🌠', '🌌', '🌙', '🌕', '🌖', '🌗'],
    #['🍔', '🍕', '🌭', '🍟', '🍗', '🍖', '🌮', '🌯', '🥙', '🍝', '🍜', '🍲'],
    #['🍩', '🍪', '🎂', '🍰', '🍫', '🍬', '🍭', '🍮', '🍦', '🍨', '🍧', '🍥']
]

symbol_values = {
    '😀': 1, '🍎': 1, '😁': 2, '🍏': 2, '😂': 3, '🍐': 3, '😃': 4, '🍊': 4, '😄': 5, '🍋': 5, '😅': 6, '🍌': 6, '😆': 7, '🍉': 7, '😇': 8, '🍇': 8, '😈': 9, '🍓': 9, '😉': 10, '🍈': 10, '😊': 11, '🍒': 11, '🙂': 12, '🍑': 12,
}
weights = {
    '😀': 5, '😁': 1, '😂': 2, '😃': 2, '😄': 1, '😅': 1, '😆': 1, '😇': 1, '😈': 1, '😉': 1, '😊': 1, '🙂': 1,
    '🍎': 1, '🍏': 1, '🍐': 1, '🍊': 1, '🍋': 1, '🍌': 1, '🍉': 1, '🍇': 2, '🍓': 1, '🍈': 1, '🍒': 1, '🍑': 1,
}

game_bp = Blueprint('game_bp', __name__)

@game_bp.route('/spin', methods=['GET'])
#@token_required
def spin():
    result = []
    for reel in slot_symbols:
        # Use the weights to make a weighted choice for the reel
        reel_weights = [weights[symbol] for symbol in reel]
        result.append(random.choices(reel, weights=reel_weights, k=1)[0])
    
    
    # Count the occurrences of each symbol in the result
    symbol_counts = Counter(result)
    # Find the symbol with the highest count (most frequent)
    most_common_symbol, count = symbol_counts.most_common(1)[0]

    # Check if there are two or more of the same symbol
    if count >= 2:
        win = True
        # The payout could be the symbol value multiplied by the count of the symbol
        # and some factor, for example 5 for two symbols, 10 for three, etc.
        payout = symbol_values[most_common_symbol] * count * 5
    else:
        win = False
        payout = 0

    return jsonify({
        'result': result,
        'win': win,
        'payout': payout
    })

@game_bp.route('/initialize', methods=['GET'])
def initialize():
    initial_state = []
    for reel in slot_symbols:
        # Choose 3 random symbols to add to the start of the reel
        start_symbols = [random.choice(reel) for _ in range(3)]
        # Choose 3 random symbols to add to the end of the reel
        end_symbols = [random.choice(reel) for _ in range(3)]
        # Concatenate start symbols, the reel, and end symbols
        extended_reel = start_symbols + reel + end_symbols
        initial_state.append(extended_reel)

    return jsonify(initial_state)