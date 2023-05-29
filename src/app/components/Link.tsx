import LinkNext from 'next/link';
import React from 'react';
import styles from './Link.module.css';

export default function LinkComponent({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <LinkNext className={styles.link} href={`/${href}`}>
            { children }
        </LinkNext>
    );
}