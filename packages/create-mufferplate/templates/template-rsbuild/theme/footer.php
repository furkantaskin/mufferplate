<footer>
</footer>

<?php if ($get_dev == "true"): ?>
    <script defer src="http://localhost:3000/js/vendors-node_modules_rsbuild_core_dist_client_overlay_js.js"></script>
    <script type="module" src="http://localhost:3000/js/main.js"></script>
    <script type="module" src="http://localhost:3000/js/form.js"></script>
<?php else: ?>
    <script type="module"
        src="<?= domain ?>assets/js/main.js<?= $_SERVER['REMOTE_ADDR'] == '::1' ? '?v=' . rand() : '' ?>"></script>
    <script type="module" src="<?= domain ?>assets/js/form.js<?= $_SERVER['REMOTE_ADDR'] == '::1' ? '?v=' . rand() : '' ?>"
        defer></script>
<?php endif; ?>
</body>

</html>