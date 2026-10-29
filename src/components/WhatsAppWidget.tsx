"use client";

import { useSiteContent } from "@/components/SiteContentProvider";

export function WhatsAppWidget() {
  const { global: globalContent } = useSiteContent();
  const widget = globalContent.whatsappWidget;

  if (!widget?.enabled || !widget?.phoneNumber) return null;

  const phone = widget.phoneNumber.replace(/\D/g, "");
  const message = encodeURIComponent(
    widget.message ?? "Hello! I would like to enquire about admissions."
  );
  const href = `https://wa.me/${phone}?text=${message}`;
  const tooltip = widget.tooltipText ?? "Chat with us on WhatsApp";

  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%, 100% {
            box-shadow:
              0 0 0 0 rgba(37, 211, 102, 0.55),
              0 8px 32px -8px rgba(37, 211, 102, 0.55);
          }
          50% {
            box-shadow:
              0 0 0 14px rgba(37, 211, 102, 0),
              0 8px 32px -8px rgba(37, 211, 102, 0.35);
          }
        }
        @keyframes wa-badge-pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.12); }
          100% { transform: scale(1); opacity: 1; }
        }
        .wa-widget-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #25D366;
          color: #fff;
          text-decoration: none;
          animation: wa-pulse 2.8s ease-in-out infinite;
          transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), background-color 220ms ease;
          cursor: pointer;
          border: none;
          outline-offset: 4px;
        }
        .wa-widget-btn:hover {
          transform: scale(1.12);
          background: #20c45d;
          animation-play-state: paused;
        }
        .wa-widget-btn:active {
          transform: scale(0.94);
        }
        .wa-widget-btn svg {
          width: 32px;
          height: 32px;
          flex-shrink: 0;
        }
        .wa-tooltip {
          position: fixed;
          bottom: 100px;
          right: 28px;
          z-index: 9999;
          background: #1a1a1a;
          color: #fff;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          padding: 0.45rem 0.85rem;
          border-radius: 8px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 200ms ease, transform 200ms ease;
        }
        .wa-tooltip::after {
          content: "";
          position: absolute;
          bottom: -6px;
          right: 22px;
          border-width: 6px 6px 0;
          border-style: solid;
          border-color: #1a1a1a transparent transparent;
        }
        .wa-widget-wrapper:hover .wa-tooltip {
          opacity: 1;
          transform: translateY(0);
        }
        .wa-widget-wrapper {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
        }
        @media (max-width: 640px) {
          .wa-widget-wrapper {
            bottom: 20px;
            right: 16px;
          }
          .wa-tooltip {
            right: 16px;
            bottom: 90px;
          }
          .wa-widget-btn {
            width: 52px;
            height: 52px;
          }
          .wa-widget-btn svg {
            width: 28px;
            height: 28px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .wa-widget-btn {
            animation: none;
            box-shadow: 0 8px 24px -6px rgba(37, 211, 102, 0.5);
          }
        }
      `}</style>

      <div className="wa-widget-wrapper" role="none">
        <div className="wa-tooltip" role="tooltip" id="wa-widget-tooltip">
          {tooltip}
        </div>
        <a
          id="whatsapp-widget-btn"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-widget-btn"
          aria-label={tooltip}
          aria-describedby="wa-widget-tooltip"
          title={tooltip}
        >
          {/* Official WhatsApp SVG logo */}
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path
              d="M24 4C12.954 4 4 12.954 4 24c0 3.557.92 6.9 2.534 9.8L4 44l10.44-2.497A19.9 19.9 0 0 0 24 44c11.046 0 20-8.954 20-20S35.046 4 24 4Z"
              fill="#fff"
            />
            <path
              d="M24 6.8c-9.483 0-17.2 7.717-17.2 17.2 0 3.217.896 6.232 2.453 8.809L7.6 40.4l7.787-2.04A17.154 17.154 0 0 0 24 41.2c9.483 0 17.2-7.717 17.2-17.2S33.483 6.8 24 6.8Z"
              fill="#25D366"
            />
            <path
              d="M32.674 28.12c-.46-.23-2.72-1.342-3.142-1.494-.42-.153-.727-.23-1.033.23-.306.46-1.187 1.494-1.455 1.8-.267.306-.535.345-.995.115-.46-.23-1.942-.716-3.699-2.284-1.368-1.22-2.29-2.727-2.558-3.187-.268-.46-.028-.709.201-.937.207-.206.46-.536.69-.804.23-.267.307-.46.46-.766.153-.306.077-.574-.038-.804-.115-.23-1.033-2.49-1.417-3.41-.374-.895-.753-.773-1.033-.787-.267-.013-.573-.016-.879-.016-.306 0-.804.115-1.225.574-.42.46-1.609 1.572-1.609 3.832 0 2.26 1.647 4.443 1.876 4.749.23.306 3.243 4.952 7.856 6.944 1.098.473 1.955.756 2.622.968 1.102.35 2.105.3 2.898.182.884-.132 2.72-1.112 3.103-2.185.382-1.073.382-1.992.267-2.184-.114-.19-.42-.306-.879-.536Z"
              fill="#fff"
            />
          </svg>
        </a>
      </div>
    </>
  );
}
