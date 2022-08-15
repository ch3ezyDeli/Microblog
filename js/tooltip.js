tippy('#reg-name', {
  content: 'Max length 50 chars',
    arrow: false,
    animateFill: true,
    interactive: true,
    placement:'top',
    trigger:'click'
  });
  tippy('#reg-username', {
    content: 'Minimum 4 chars & Maximum 20 chars',
      arrow: false,
      animateFill: true,
      interactive: true,
      placement:'top',
      trigger:'click'
    });

tippy('#reg-password', {
    content: 'Password Length should be a minimum of 6 characters' + 
                ' and a maximum of 10 characters must be a combination of numbers and letters (alphanumeric)',
    arrow: false,
    animateFill: true,
    placement:'top',
    trigger:'click'
  });