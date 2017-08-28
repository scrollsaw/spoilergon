# spoilergon

a simple little chrome extension that uses jQuery to hide articles on Polygon, The Verge, and Vox


popup.js 
Manages the master list of keywords and categories that will be blocked.
Uses chrome.storage to store the lists.
The sites are similar enough that a universal list can be used on all sites.

verge_filter.js, polygon_filter.js, etc. 
Does the blocking.

The code loops through the block list, and for each item it searches the document for elements that need to be blocked. 
If the site code changes, the hide_Block calls can be modified to get things working again.

Older versions of the sites used some dynamic loading that required MutationObservers to block freshly loaded content. 
New versions of the sites don't use this, so that code is disabled. But left in for future reference.


Known Issues:
- Articles that appear in the sidebar on subpages aren't always blocked. Just need to add the appropriate hide_Block calls.


