class ZhihuAnswerDetailPage {
  start() {
    const tankUtil = window.tankUtils;
    if (!tankUtil) {
      return;
    }
    // 先添加按钮，根据按钮操作，是否要移除 dom
    if (tankUtil.isPC) {
      this.addPCOperationButton();
    } else {
      this.removeMobilePageDom();
    }
  }

  /**
   * 创建操作按钮
   */
  createRemoveDomButton() {
    const removeDomButton = document.createElement('button');
    removeDomButton.innerText = '移除其他元素';
    window.tankUtils.commonSetDomStyle(removeDomButton, {
      padding: '4px 8px',
      'border-radius': '4px',
      background: '#ff7000',
      color: '#fff',
      'font-size': '16px',
    });
    return removeDomButton;
  }

  /**
   * PC 上，添加操作按钮
   */
  addPCOperationButton() {
    const removeDomButton = this.createRemoveDomButton();
    const questionHeaderTopics = window.tankUtils.findDom('.QuestionHeader-topics');
    if (questionHeaderTopics) {
      questionHeaderTopics.appendChild(removeDomButton);
    }
    removeDomButton.onclick = () => {
      this.removePCPageDom();
    };
  }

  /**
   * 移除 PC 页面上的 DOM
   */
  removePCPageDom() {
    {
      // 移除右边的侧边栏
      window.tankUtils.removeDom('.Question-sideColumn');

      // 移除右边的广告
      window.tankUtils.removeDom('.Question-sideColumnAdContainer');

      // 移除右边的关注者、被浏览
      window.tankUtils.removeDom('.QuestionFollowStatus');

      // 移除右边的作者 AnswerAuthor
      window.tankUtils.removeDom('.AnswerAuthor');

      // 移除页面底部的网站声明信息
      window.tankUtils.removeDom('[role="contentinfo"]');

      // 移除更多回答
      window.tankUtils.removeDom('.MoreAnswers');

      // 移除查看全部回答
      window.tankUtils.removeDom('.ViewAll');

      // 移除补充信息
      window.tankUtils.removeDom('[role="complementary"]');
    }
  }

  /**
   * 移除移动端页面上的 DOM
   */
  removeMobilePageDom() {
    {
      // 移除页面顶部的【打开App】
      const headerOpenBtn = window.tankUtils.findDom('.Button--withLabel');
      if (headerOpenBtn) {
        const parentElementL1 = headerOpenBtn.parentElement;
        parentElementL1.removeChild(headerOpenBtn);
      }
    }

    {
      // 移除作者信息
      window.tankUtils.removeDom('[itemprop="author"]');

      // 移除 App 内打开
      window.tankUtils.removeDom('.OpenInAppButton');

      // 移除右下角的 Avatar
      window.tankUtils.removeDom('.Avatar');
    }

    {
      // 移除 AI 总结
      const richContentDom = window.tankUtils.findDom('.RichContent');
      if (richContentDom && richContentDom.nextElementSibling) {
        richContentDom.nextElementSibling.remove();
      }
    }

    {
      // oia-action-bar
      const oiaActionBar = window.tankUtils.findDom('.oia-action-bar');
      if (oiaActionBar) {
        const agreeButton = window.tankUtils.findDom('.ZDI--AgreeFill24');
        if (agreeButton) {
          const agreeNumSpan = agreeButton.nextElementSibling;
          if (agreeNumSpan) {
            const innerText = (agreeNumSpan.innerText || '').replace('已赞同 ', '').trim();
            if (innerText) {
              const agreeNum = parseInt(innerText || 0);
              agreeNumSpan.innerText = `${agreeNum}`;
            }
          }
        }
      }
    }
  }
}

window.onload = function () {
  const zhihuAnswerDetailPage = new ZhihuAnswerDetailPage();
  setTimeout(() => {
    zhihuAnswerDetailPage.start();
    console.log('zhihuAnswerDetailPage.start()');
  }, 3000);
};
