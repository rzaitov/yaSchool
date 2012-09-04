function Navigator(sb, navigationContainer, sectionContainer) {
	var isCurSectionDetectionEnabled = true;

	var hash = {};
	var jNavigationItems = $('.navSectionTitle, .navSubSection', navigationContainer).each(function() {
		var href = $(this).attr('href').replace('#','');
		hash[href] = {
			navigation: this
		};
	});

	// Получаем отсортированный список секций (нулевой элемент выше всего, последний элемент ниже всех)
	var sortedSectionItems = $('.sectionTitle, .subsection', sectionContainer).map(function() {
		hash[$(this).attr('id')].section = this;

		return {
			top: $(this).offset().top,
			elem: this
		};
	})
	.get()
	.sort(function(a, b) {
		return a.top - b.top;
	});

	var selectSection = function(domElem) {
		$(domElem).addClass('activeSection');
	};

	var unselectSection = function(domElem) {
		$(domElem).removeClass('activeSection');
	};

	var unselectAll = function() {
		jNavigationItems.removeClass('activeSection');
	};

	var navigateTo = function(domElement) {
		var elemId = $(domElement).attr('href');

		var topOffset = $(elemId).offset().top;
		isCurSectionDetectionEnabled = false;

		$('html, body').animate({
			scrollTop: topOffset
		}, 500, function() {
			isCurSectionDetectionEnabled = true;
		});
	};

	jNavigationItems.click(function() {
		unselectAll();
		selectSection(this);

		navigateTo(this);

		return false;
	});

	$(window).scroll(function() {
		var len = sortedSectionItems.length;
		if(!isCurSectionDetectionEnabled || len === 0)
		{
			return;
		}

		var screenPos = $(window).scrollTop();
		var elem = null;

		if(screenPos <= sortedSectionItems[0].top)
		{
			elem = sortedSectionItems[0].elem;
		}
		else if(screenPos >= sortedSectionItems[len - 1].top)
		{
			elem = sortedSectionItems[len - 1].elem;
		}
		else
		{
			for(var i = 0; i < len - 1; i +=1)
			{
				if(screenPos >= sortedSectionItems[i].top && screenPos < sortedSectionItems[i + 1].top)
				{
					elem = sortedSectionItems[i].elem;
					break;
				}
			}
		}

		unselectAll();
		selectSection(hash[$(elem).attr('id')].navigation);
	});
}
