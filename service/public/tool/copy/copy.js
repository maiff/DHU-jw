var copy=(function(){
	function newTransfer(){
		var transfer = document.getElementById('J_CopyTransfer');
        if (!transfer) {
            transfer = document.createElement('textarea');
            transfer.id = 'J_CopyTransfer';
            transfer.style.position = 'absolute';
            transfer.style.left = '-9999px';
            transfer.style.top = '-9999px';
            document.body.appendChild(transfer);
        }
        return transfer;
	}
	function getValue(target){
		
		var transfer=newTransfer();
		transfer.value=target.innerHTML;

		transfer.focus();
        transfer.select();
        try {
        // copy text
        // 复制文本
        	document.execCommand('copy');
        	alert('success!')
        
      	}
      	catch (err) {
        	alert('please press Ctrl/Cmd+C to copy');
     	 }

	}

	return function(ele){
		
			getValue(ele)
		
	}
})()