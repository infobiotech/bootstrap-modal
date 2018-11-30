/*!
 * bootstrapModal
 * Version: 2.0.0-beta
 *
 * Dual licensed under the MIT and GPL licenses.
 *
 * Copyright (c) 2012-2018 Alessandro Raffa <contact@alessandroraffa.eu>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * @see http://opensource.org/licenses/mit-license.php
 * @see http://www.gnu.org/licenses/gpl.html
 *
 * Requires: jQuery v3.3, Twitter Bootstrap v4.1
 */
/**
 * bootstrapModal
 * @author  Alessandro Raffa <contact@alessandroraffa.eu>
 * @todo    write clear documentation ;-)
 * @todo    improove performance
 * @todo    cross-browser compatibility
 * @param {type} $
 * @returns {undefined}
 */
(function ($) {
    /*
     *
     */
    $.fn.extend({
        /*
         *
         * @param {type} options
         * @returns {String}
         */
        bootstrapModal: function (options) {
            /**
             * Stores the version
             */
            var _version = '2.0.0-beta';
            /*
             * @todo  check minimum required versions of jquery and bootstrap
             */
            /*
             *
             * @type Object
             */
            var defaults = {
                title: '',
                titleStyle: '',
                body: '',
                dismiss: true,
                dismissLabel: 'Ok',
                autodismiss: false,
                autodismissLabel: 'Autodismiss',
                actions: {},
                callback: null,
                endlessProgressBar: false,
                verticallyCentered: false,
                large: false,
                countdown: 3, // seconds
                debug: false
            };
            /*
             *
             * @param {type} obj
             * @returns {unresolved}
             * @see     http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
             */
            var ___checkType = function (obj) {
                return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
            /*
             *
             * @type Object
             */
            switch (___checkType(options)) {
                case 'string':
                    switch (options) {
                        case 'version':
                            return _version;
                            break;
                        default:
                            return null;
                            break;
                    }
                    break;
                case 'null':
                case 'object':
                    /**
                     *
                     * @type Object
                     */
                    var options = $.extend(defaults, options);
                    /**
                     *
                     * @type type
                     */
                    var counter = null;
                    /**
                     *
                     * @type Number|.$@call;extend.countdown
                     */
                    var countdown = options.countdown;
                    /**
                     *
                     * @type Array
                     */
                    var titleStyles = ['warning', 'error', 'info', 'success'];
                    /**
                     *
                     * @type Number
                     */
                    var actionsCounter = 0;
                    /*
                     *
                     * @type Array
                     */
                    var _actionStyles = [
                        'primary',
                        'secondary',
                        'success',
                        'danger',
                        'warning',
                        'info',
                        'light',
                        'dark',
                        'outline-primary',
                        'outline-secondary',
                        'outline-success',
                        'outline-danger',
                        'outline-warning',
                        'outline-info',
                        'outline-light',
                        'outline-dark',
                        'link'
                    ];
                    /*
                     *
                     * @type $
                     */
                    var $modal = $(document.createElement('div'));
                    /*
                     *
                     * @type $
                     */
                    var $modalDialog = $(document.createElement('div'));
                    /*
                     *
                     * @type $
                     */
                    var $modalContent = $(document.createElement('div'));
                    /*
                     *
                     * @type $
                     */
                    var $modalHeader = $(document.createElement('div'));
                    /*
                     *
                     * @type $
                     */
                    var $modalTitle = $(document.createElement('h5'));
                    /*
                     *
                     * @type $
                     */
                    var $modalDismisser = $(document.createElement('button'));
                    /*
                     *
                     * @type $
                     */
                    var $modalFooterDismisser = $(document.createElement('button'));
                    /*
                     *
                     * @type $
                     */
                    var $modalBody = $(document.createElement('div'));
                    /*
                     *
                     * @type $
                     */
                    if (___checkType(options.actions) !== 'boolean') {
                        var $modalFooter = $(document.createElement('div'));
                    }
                    /*
                     *
                     * @returns {Function}
                     */
                    ___run();
                    break;
                default:
                    /*
                     *
                     * @returns {Function}
                     */
                    return null;
                    break;
            }
            /*
             *
             * @returns {Function}
             */
            function ___run() {
                // destroy other bootstrap modals eventually active
                ___destroy($('div.modal.bootstrap-modal'));
                /*
                 * modalFooter
                 */
                if (___checkType(options.actions) !== 'boolean') {
                    $modalFooter.addClass('modal-footer');
                }
                /*
                 * modalTitle
                 */
                if (___checkType(options.title) === 'string') {
                    $modalTitle.html(options.title);
                } else {
                    $modalTitle.html(defaults.title);
                }
                if (jQuery.inArray(options.titleStyle, titleStyles) >= 0) {
                    $modalTitle.addClass('text-' + options.titleStyle);
                }
                /*
                 * modalHeader
                 */
                $modalHeader.addClass('modal-header');
                $modalHeader.append($modalTitle);
                /*
                 * modalDismisser
                 */
                if (___checkType(options.dismiss) === 'boolean' && options.dismiss === true) {
                    $modalDismisser.attr('type', 'button');
                    $modalDismisser.addClass('close');
                    $modalDismisser.attr('data-dismiss', 'modal');
                    $modalDismisser.attr('aria-label', options.dismissLabel);
                    $modalDismisser.html('<span aria-hidden="true">&times;</span>');
                    $modalHeader.append($modalDismisser);
                    /*
                     *
                     */
                    if (___checkType(options.actions) !== 'boolean') {
                        $modalFooterDismisser.attr('type', 'button');
                        $modalFooterDismisser.addClass('btn');
                        $modalFooterDismisser.addClass('btn-light');
                        $modalFooterDismisser.attr('data-dismiss', 'modal');
                        $modalFooterDismisser.html(options.dismissLabel);
                        $modalFooter.append($modalFooterDismisser);
                    }
                    /*
                     *
                     */
                    $modal.modal({
                        show: false,
                        backdrop: true,
                        keyboard: true
                    });
                } else {
                    /*
                     *
                     */
                    $modal.modal({
                        show: false,
                        backdrop: 'static',
                        keyboard: false
                    });
                }
                /*
                 * actions
                 */
                if (___checkType(options.actions) === 'object') {
                    ___addAction(options.actions);
                } else {
                    if (___checkType(options.actions) === 'array') {
                        for (var i = 0; i < options.actions.length; i++) {
                            ___addAction(options.actions[i]);
                        }
                    }
                }
                /*
                 * modalBody
                 */
                $modalBody.addClass('modal-body');
                if (___checkType(options.body) === 'object' && options.body instanceof jQuery) {
                    $modalBody.append(options.body);
                } else {
                    if (___checkType(options.body) === 'string') {
                        $modalBody.html(options.body);
                    } else {
                        $modalBody.html(defaults.body);
                    }
                }
                /*
                 * endlessProgressBar
                 */
                if (___checkType(options.endlessProgressBar) === 'boolean' && options.endlessProgressBar === true) {
                    var $endlessProgressBarContainer = $(document.createElement('div'));
                    $endlessProgressBarContainer.addClass('progress');
                    $endlessProgressBarContainer.addClass('mb-0');
                    $endlessProgressBarContainer.addClass('pb-0');
                    var $endlessProgressBar = $(document.createElement('div'));
                    $endlessProgressBar.addClass('progress-bar');
                    $endlessProgressBar.addClass('progress-bar-striped');
                    $endlessProgressBar.addClass('progress-bar-animated');
                    $endlessProgressBar.addClass('mb-0');
                    $endlessProgressBar.addClass('pb-0');
                    $endlessProgressBar.attr('role', 'progressbar');
                    $endlessProgressBar.width('100%');
                    $endlessProgressBar.attr('aria-valuenow', '100');
                    $endlessProgressBar.attr('aria-valuemin', '0');
                    $endlessProgressBar.attr('aria-valuemax', '100');
                    $endlessProgressBarContainer.append($endlessProgressBar);
                    $modalBody.append($endlessProgressBarContainer);
                }
                /*
                 *
                 */
                $modalContent.addClass('modal-content');
                if (___checkType(options.dismiss) === 'boolean' && options.dismiss === true && options.title !== '') {
                    $modalContent.append($modalHeader);
                }
                $modalContent.append($modalBody);
                if (___checkType(options.actions) !== 'boolean') {
                    $modalContent.append($modalFooter);
                }
                /*
                 * modalDialog
                 */
                $modalDialog.attr('role', 'document');
                $modalDialog.addClass('modal-dialog');
                if (___checkType(options.verticallyCentered) === 'boolean' && options.verticallyCentered === true) {
                    $modalDialog.addClass('modal-dialog-centered');
                }
                if (___checkType(options.large) === 'boolean' && options.large === true) {
                    $modalDialog.addClass('modal-lg');
                }
                $modalDialog.append($modalContent);
                /*
                 * modal
                 */
                $modal.addClass('modal');
                $modal.addClass('bootstrap-modal');
                $modal.attr('tabindex', '-1');
                $modal.attr('role', 'dialog');
                $modal.append($modalDialog);
                /*
                 * show the modal
                 */
                $modal.modal({show: true});
                /*
                 * autodismiss and countdown
                 */
                if (___checkType(options.autodismiss) === 'boolean' && options.autodismiss === true) {
                    setTimeout(
                            function () {
                                ___destroy($modal);
                                if (___checkType(options.callback) === 'function') {
                                    options.callback();
                                }
                            },
                            countdown * 1000
                            );

                    if (___checkType(options.dismiss) === 'boolean' && options.dismiss === false) {
                        if (___checkType(options.actions) !== 'boolean') {
                            $modalFooterDismisser.attr('href', '#');
                            $modalFooterDismisser.attr('disabled', 'disabled');
                            $modalFooterDismisser.addClass('btn');
                            $modalFooterDismisser.unbind('click');
                            $modalFooter.append($modalFooterDismisser);
                        }
                    }
                    /*
                     *
                     */
                    var autodismissLabel = defaults.autodismissLabel;
                    if (___checkType(options.autodismissLabel) === 'string') {
                        autodismissLabel = options.autodismissLabel;
                    }
                    /*
                     *
                     */
                    $modalFooterDismisser.html(
                            autodismissLabel + ' (' + countdown + ')'
                            );
                    counter = setInterval(function () {
                        ___timer();
                    }, 1000);
                } else {
                    if (___checkType(options.callback) === 'function') {
                        $modal.unbind('hidden');
                        $modal.on('hidden', function () {
                            options.callback();
                            $modal.unbind('hidden');
                            $modal.on('hidden', function () {
                                ___destroy($modal);
                            });
                        });
                    } else {
                        $modal.unbind('hidden');
                        $modal.on('hidden', function () {
                            ___destroy($modal);
                        });
                    }
                }
                return function () {};
            }
            /**
             *
             * @returns {undefined}
             */
            function ___timer() {
                /*
                 *
                 */
                countdown = countdown - 1;
                /*
                 *
                 */
                if (countdown <= 0) {
                    clearInterval(counter);
                    return;
                }
                /*
                 *
                 * @type defaults.autodismissLabel|String|.$@call;extend.autodismissLabel
                 */
                var autodismissLabel = defaults.autodismissLabel;
                if (___checkType(options.autodismissLabel) === 'string') {
                    autodismissLabel = options.autodismissLabel;
                }
                $modalFooterDismisser.html(autodismissLabel + ' (' + countdown + ')');
                /*
                 *
                 */
            }
            /**
             *
             * @param {type} action
             * @returns {undefined}
             */
            function ___addAction(action) {
                if (action === null) {
                    return;
                } else {
                    if (___checkType(action) === 'object') {
                        /**
                         *
                         * @type Object
                         */
                        var $modalAction;
                        actionsCounter++;
                        /*
                         *
                         */
                        if (___checkType(action.callback) === 'function') {
                            $modalAction = $(document.createElement('button'));
                            $modalAction.attr('type', 'button');
                            $modalAction.click(function (event) {
                                event.preventDefault();
                                event.stopPropagation();
                                action.callback();
                                ___destroy($modal);
                            });
                        } else {
                            $modalAction = $(document.createElement('a'));
                            if (action.href) {
                                $modalAction.attr('href', action.href);
                            } else {
                                $modalAction.attr('href', '#');
                                $modalAction.attr('data-dismiss', 'modal');
                            }
                        }
                        /*
                         * btn
                         */
                        $modalAction.addClass('btn');
                        if (___checkType(action.style) === 'string') {
                            if (jQuery.inArray(action.style, _actionStyles) >= 0) {
                                $modalAction.addClass('btn-' + action.style);
                            }
                        }
                        /*
                         *
                         */
                        $modalAction.html(action.label ? action.label : ('Action' + actionsCounter));
                        /*
                         *
                         */
                        if (___checkType(options.actions) !== 'boolean') {
                            $modalFooter.append($modalAction);
                        }
                    }
                    return;
                }
            }
            /**
             *
             * @param {type} $modalElement
             * @returns {undefined}
             */
            function ___destroy($modalElement) {
                $modalElement.modal('hide');
                $modalElement.modal({show: false});
                $modalElement.remove();
                return;
            }
        }
    });
})(jQuery);
